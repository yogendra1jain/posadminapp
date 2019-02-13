let APPLICATION_BFF_URL
if (process.env.NODE_ENV !== 'production') {
    APPLICATION_BFF_URL = process.env.APPLICATION_BFF_URL;
}
else {
    APPLICATION_BFF_URL = process.env.APPLICATION_BFF_URL;
}

export { APPLICATION_BFF_URL };
