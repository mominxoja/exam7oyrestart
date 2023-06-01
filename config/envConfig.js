const { env } = process;

const envConfig = {
    PORT: env.PORT || 4000,
    JWT_SECRET: env.JWT_SECRET
}

module.exports = envConfig