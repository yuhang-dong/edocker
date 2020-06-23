// 每5s ping 一次 docker server
let pingPeriod = 5000;

// 每5s 获取依次最新的 container
let getContainersPeriod = 5000;

// 连接docker的每次操作超时为1s
let connectionTimeOut = 1000;
export {
    pingPeriod,
    getContainersPeriod,
    connectionTimeOut

};