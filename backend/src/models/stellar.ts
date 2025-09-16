import { SorobanClient, Address, Contract } from 'stellar-sdk';

const sorobanServer = new SorobanClient.Server('https://rpc-futurenet.stellar.org');
const contractId = 'SEU_CONTRACT_ID'; // Substitua pelo endereço do seu contrato
const contractId = "CAQTKL46VVXCU2765KTCLENVSAJBALM3QP2ZSZDUHRYSBH2EBQ2VXSOA"

export async function getBalance(address: string): Promise<number> {
  // O endereço deve ser passado como Address
  const addr = new Address(address);

  // Monta a chamada ao método do contrato
  const result = await sorobanServer.callContract({
    contractId,
    function: 'read_balance',
    args: [addr.toString()],
  });

  // O resultado pode variar conforme o contrato, ajuste conforme necessário
  return Number(result.result);
}

// Exemplo: chamar um método do contrato
const result = await sorobanServer.getContractData(contractId, 'check_nonnegative_amout', [5]);

console.log(result)

// async function registrarContratoStellar(tenantPublicKey: string, landlordPublicKey: string, valor: number) {
//     // 1. Montar a transação: Criar uma transação Stellar que chama o método do contrato inteligente Soroban responsável por registrar o contrato. Os parâmetros (chaves públicas e valor) são passados para o método do contrato.
//     // 2. Assinar a transação: A transação deve ser assinada pela conta que está realizando a operação (geralmente o proprietário ou um administrador).
//     // 3. Enviar para a rede: A transação é enviada para a testnet da Stellar usando o SDK.
//     // 4. Receber resposta: O resultado da operação (sucesso, erro, hash da transação) é retornado para ser salvo ou exibido.
// }


// // Consulting transactions of an account
// const accountId = 'GBBORXCY3PQRRDLJ7G7DWHQBXPCJVFGJ4RGMJQVAX6ORAUH6RWSPP6FM';

// server.transactions()
//     .forAccount(accountId)
//     .call()
//     .then(function (page) {
//         console.log('Page 1: ');
//         console.log(page.records);
//         return page.next();
//     })
//     .then(function (page) {
//         console.log('Page 2: ');
//         console.log(page.records);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });