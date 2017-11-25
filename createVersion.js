/**
 * 建立版本号
 */

const base_data=946656000000;
const start_data=0x10000;
const end_data=0xFFFFF;

function createVersion(){
      return Date.now().toString(16)+(Math.random()*(end_data-start_data)+start_data|0).toString(16);
}

module.exports=createVersion;