use soroban_sdk::{contracttype, Address};



/// Define quantos ledgers equivalem a um "dia"
pub(crate) const DAY_IN_LEDGERS: u32 = 17280;

/// Tempo de vida (TTL) do estado da instância do contrato.
/// A cada interação, pode ser "renovado" por mais 7 dias.
pub(crate) const INSTANCE_BUMP_AMOUNT: u32 = 7 * DAY_IN_LEDGERS;

/// Limite de renovação para a instância.
/// Se faltar menos de 1 dia, o TTL é estendido.
pub(crate) const INSTANCE_LIFETIME_THRESHOLD: u32 = INSTANCE_BUMP_AMOUNT - DAY_IN_LEDGERS;

/// Tempo de vida do armazenamento de saldos.
/// Aqui é mais longo: 30 dias.
pub(crate) const BALANCE_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;

/// Limite de renovação para saldos.
pub(crate) const BALANCE_LIFETIME_THRESHOLD: u32 = BALANCE_BUMP_AMOUNT - DAY_IN_LEDGERS;

/// Estrutura que identifica uma permissão (allowance).
/// Contém o `from` (dono) e o `spender` (quem pode gastar).
#[derive(Clone)]
#[contracttype]
pub struct AllowanceDataKey {
    pub from: Address,
    pub spender: Address,
}

/// Valor associado a uma permissão (allowance).
/// `amount` = quanto pode ser gasto
/// `expiration_ledger` = até quando é válido
#[contracttype]
pub struct AllowanceValue {
    pub amount: i128,
    pub expiration_ledger: u32,
}

#[derive(Clone)]
#[contracttype]
pub struct RentInf {
    pub pay_day: u64,
    pub is_paid: bool,
}

/// Enum que define as diferentes chaves de dados
/// usadas pelo contrato para armazenar informações.
/// Cada variante corresponde a um "tipo" de dado salvo no ledger.
#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Allowance(AllowanceDataKey),
    Balance(Address),
    Nonce(Address),
    State(Address),
    Admin,
    Frozen(Address),
    RentInf(Address),
}
