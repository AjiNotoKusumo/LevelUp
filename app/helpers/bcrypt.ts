import bcrypt from 'bcryptjs'

const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password: string, hashedPass: string) => {
    return bcrypt.compareSync(password, hashedPass)
}

export {hashPassword, comparePassword}