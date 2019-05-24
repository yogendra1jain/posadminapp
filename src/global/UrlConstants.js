let APPLICATION_BFF_URL;

console.log("ENV ++", process.env);

if (process.env.NODE_ENV !== 'production') {
    APPLICATION_BFF_URL = "http://13.126.59.19:20029/api/"; 
}
else {
    APPLICATION_BFF_URL = process.env.APPLICATION_BFF_URL;
    console.log('process -- env', process.env);
}

export {
    APPLICATION_BFF_URL
};
