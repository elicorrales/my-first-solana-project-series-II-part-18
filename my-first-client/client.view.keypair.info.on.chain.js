const {
  Keypair,
  Connection,
  TransactionInstruction,
  Transaction,
} = require('@solana/web3.js');

const program = Keypair.fromSecretKey(
  new Uint8Array([
    180, 137, 213, 5, 46, 163, 87, 113, 183, 38, 132, 196, 155, 103, 24, 159,
    23, 185, 182, 85, 52, 54, 197, 185, 156, 93, 207, 66, 186, 51, 253, 234,
    58, 94, 185, 123, 24, 200, 32, 92, 62, 189, 182, 246, 54, 186, 96, 186, 77,
    83, 168, 220, 117, 90, 121, 48, 74, 88, 216, 80, 101, 43, 124, 123
  ])
);

if (process.argv.length < 4) {
  console.log('\n\nNEED TWO KEYPAIR JSON ARRAY STRINGS.');
  console.log('1ST KEYPAIR PAYS FOR TRANSACTION.');
  console.log('2ND KEYPAIR IS TO BE VIEWED ON-CHAIN.\n\n');
  return;
}

let payerKeypairString = process.argv[2];
let payerKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(payerKeypairString)));
let payerPublicKey = payerKeypair.publicKey;
console.log(payerPublicKey.toString());

let acctKeypairString = process.argv[3];
let acctKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(acctKeypairString)));
let acctPublicKey = acctKeypair.publicKey;
console.log(acctPublicKey.toString());


(async () => {
  console.log('Establishing Connection...');
  let rpcUrl = 'http://localhost:8899';
  let connection = new Connection(rpcUrl, 'confirmed');

  console.log('Get Version...');
  const version = await connection.getVersion()
  console.log('Version: ', version);


  let instruction = new TransactionInstruction({
    programId: program.publicKey,
    keys: [{ pubkey: acctKeypair.publicKey }],
    data: []
  })
  let transaction = new Transaction(instruction);
  transaction.add(instruction);
  await connection.sendTransaction(transaction, [payerKeypair]);


  console.log('Done.');

})()





