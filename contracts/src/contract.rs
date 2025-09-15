use crate::admin::{has_administrator, read_administrator, write_administrator};
use crate::allowance::{read_allowance, spend_allowance, write_allowance};
use crate::balance::{read_balance, receive_balance, spend_balance};
use crate::metadata::{read_decimal, read_name, read_symbol, write_metadata};
use crate::storage_types::{INSTANCE_BUMP_AMOUNT, INSTANCE_LIFETIME_THRESHOLD};
use crate::storage_types::DataKey;
use soroban_sdk::token::{self, Interface as _};
use soroban_sdk::{contract, contractimpl, Address, Env, String};
use soroban_token_sdk::metadata::TokenMetadata;
use soroban_token_sdk::TokenUtils;


///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// CRIANDO FUNÇÕES QUE SERÃO USADAS AO LONGO DO CÓDIGO ///////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

// Helper function: Checks that the amount is non-negative
fn check_nonnegative_amount(amount: i128) {
    if amount < 0 {
        panic!("negative amount is not allowed: {}", amount)
    }
}

// Helper function: Checks if an account is frozen
fn is_account_frozen(e: &Env, account: &Address) -> bool {
    let key = DataKey::Frozen(account.clone());
    e.storage().instance().get::<_, bool>(&key).unwrap_or(false)
}

// Helper function: Emits a custom event for freeze/unfreeze actions
fn emit_custom_event(e: &Env, event_type: &str, admin: Address, account: Address) {
    e.events().publish((event_type, admin, account), ());
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

#[contract]
pub struct Token;

#[contractimpl]
impl Token {
    //////////////////////////////////////////////////////////////////////////////////////////////
    ///// Cria funcao - Initializes the contract with an admin, decimals, name, and symbol ///////
    //////////////////////////////////////////////////////////////////////////////////////////////

    pub fn initialize(e: Env, admin: Address, decimal: u32, name: String, symbol: String) {
        if has_administrator(&e) {
            panic!("already initialized")
        }
        write_administrator(&e, &admin);

        if decimal > u8::MAX.into() {
            panic!("Decimal must fit in a u8");
        }

        write_metadata(
            &e,
            TokenMetadata {
                decimal,
                name,
                symbol,
            },
        )
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    /////        Mints new tokens to a specified address (only callable by admin)       //////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    pub fn mint(e: Env, to: Address, amount: i128) {
        check_nonnegative_amount(amount);
        let admin = read_administrator(&e);
        admin.require_auth();

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        receive_balance(&e, to.clone(), amount);
        TokenUtils::new(&e).events().mint(admin, to, amount);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////               Updates the contract administrator              /////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    pub fn set_admin(e: Env, new_admin: Address) {
        let admin = read_administrator(&e);
        admin.require_auth();

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        write_administrator(&e, &new_admin);
        TokenUtils::new(&e).events().set_admin(admin, new_admin);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////  Freezes an account, preventing it from sending or spending tokens (admin only)   /////
    //////////////////////////////////////////////////////////////////////////////////////////////
    
    pub fn freeze_account(e: Env, account: Address) {
        let admin = read_administrator(&e);
        admin.require_auth();

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        let key = DataKey::Frozen(account.clone());
        e.storage().instance().set(&key, &true);

        emit_custom_event(&e, "freeze_account", admin, account);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    /////        Unfreezes an account, allowing token operations again (admin only)         //////
    //////////////////////////////////////////////////////////////////////////////////////////////
    
    pub fn unfreeze_account(e: Env, account: Address) {
        let admin = read_administrator(&e);
        admin.require_auth();

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        let key = DataKey::Frozen(account.clone());
        e.storage().instance().remove(&key);

        emit_custom_event(&e, "unfreeze_account", admin, account);
    }
}

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

#[contractimpl]
impl token::Interface for Token {
    /// Returns the allowance of a spender for a given owner
    fn allowance(e: Env, from: Address, spender: Address) -> i128 {
        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        read_allowance(&e, from, spender).amount
    }

    /// Approves a spender to spend a certain amount on behalf of the owner
    fn approve(e: Env, from: Address, spender: Address, amount: i128, expiration_ledger: u32) {
        from.require_auth();
        check_nonnegative_amount(amount);

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        write_allowance(&e, from.clone(), spender.clone(), amount, expiration_ledger);
        TokenUtils::new(&e)
            .events()
            .approve(from, spender, amount, expiration_ledger);
    }

    /// Returns the balance of a given account
    fn balance(e: Env, id: Address) -> i128 {
        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        read_balance(&e, id)
    }

    /// Transfers tokens from the sender to another account
    fn transfer(e: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();
        check_nonnegative_amount(amount);

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        // Check if sender's account is frozen
        if is_account_frozen(&e, &from) {
            panic!("Account is frozen and tokens cannot be transferred");
        }

        spend_balance(&e, from.clone(), amount);
        receive_balance(&e, to.clone(), amount);
        TokenUtils::new(&e).events().transfer(from, to, amount);
    }

    /// Transfers tokens on behalf of another account using allowance
    fn transfer_from(e: Env, spender: Address, from: Address, to: Address, amount: i128) {
        spender.require_auth();
        check_nonnegative_amount(amount);

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        // Check if the source account is frozen
        if is_account_frozen(&e, &from) {
            panic!("Account is frozen and tokens cannot be transferred");
        }

        spend_allowance(&e, from.clone(), spender, amount);
        spend_balance(&e, from.clone(), amount);
        receive_balance(&e, to.clone(), amount);
        TokenUtils::new(&e).events().transfer(from, to, amount)
    }

    /// Burns tokens from the caller's account
    fn burn(e: Env, from: Address, amount: i128) {
        from.require_auth();
        check_nonnegative_amount(amount);

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        if is_account_frozen(&e, &from) {
            panic!("Account is frozen and tokens cannot be burned");
        }

        spend_balance(&e, from.clone(), amount);
        TokenUtils::new(&e).events().burn(from, amount);
    }

    /// Burns tokens from another account using allowance
    fn burn_from(e: Env, spender: Address, from: Address, amount: i128) {
        spender.require_auth();
        check_nonnegative_amount(amount);

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        if is_account_frozen(&e, &from) {
            panic!("Account is frozen and tokens cannot be burned");
        }

        spend_allowance(&e, from.clone(), spender, amount);
        spend_balance(&e, from.clone(), amount);
        TokenUtils::new(&e).events().burn(from, amount)
    }

    /// Returns the token's decimal precision
    fn decimals(e: Env) -> u32 {
        read_decimal(&e)
    }

    /// Returns the token's name
    fn name(e: Env) -> String {
        read_name(&e)
    }

    /// Returns the token's symbol
    fn symbol(e: Env) -> String {
        read_symbol(&e)
    }
}
