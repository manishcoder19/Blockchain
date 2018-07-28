const SHA256=require('crypto-js/sha256');
class Block
{
constructor(index,timestamp,data,previousHash=''){
 this.index=index;
this.previousHash=previousHash;
this.timestamp=timestamp;
this.data=data;
this.hash=this.calculateHash();
this.nounce=0;
}
calculateHash()
{
  return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nounce).toString();
}
mineBlock(difficulty){
  while(this.hash.substring(0,difficulty)!==Array(difficulty + 1).join("0")){
    this.nounce++;
    this.hash=this.calculateHash();
}
console.log("Block mined: "+ this.hash);
}
}
class Blockchain{
  constructor(){
this.chain=[this.createGenesisBlock()];
this.difficulty=8;
}
createGenesisBlock()
{
 return new Block(0,"01/01/2017","Genesis block","0");
 }
getLatestBlock()
{
return this.chain[this.chain.length-1];
}
addBlock(newBlock)
{
newBlock.previousHash=this.getLatestBlock().hash;
newBlock.mineBlock(this.difficulty);
this.chain.push(newBlock);
}
isChainValid()
{
for(let i=1;i<this.chain.length;i++)
{
const currentBlock=this.chain[i];
const previousBlock=this.chain[i-1];
if(currentBlock.hash!==currentBlock.calculateHash()){
return false;
}
if(currentBlock.previousHash!==previousBlock.hash){
return false;
}
}
return true;
}
}
let manish= new Blockchain();
console.log("Mining Block 1....");
manish.addBlock(new Block(1,"10/07/2017",{amount:4}));
console.log("Mining Block 2....");
manish.addBlock(new Block(2,"12/07/2017",{amount:10}));
console.log("Mining Block 3....");
manish.addBlock(new Block(3,"14/07/2017",{amount:16}));
console.log("Mining Block 4....");
manish.addBlock(new Block(4,"16/07/2017",{amount:20}));
