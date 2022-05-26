const bcryptjs = require('bcryptjs');

const User = require('../models/user');

////////////////////////////////////////////////////////////////

const postLogin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ where: { email }})
        .then((user) => {
            console.log('user', user);
            if (!user) {
                res.status(401).json({ message: '找不到帳號，或密碼錯誤！'});
            }
            bcryptjs
                .compare(password, user.password)
                .then((isMatch) => {
                    console.log('isMatch', isMatch);
                    if (isMatch) {
                        res.status(200).json({ message: '登入成功' });
                    }
                })
                .catch((err) => {
                    res.status(401).json({ message: '找不到帳號，或密碼錯誤！'});
                })
        })
        .catch((err) => {
            res.status(500).json({ errorMessage: '伺服器發生錯誤' })
        });
};

const postSignup = (req, res, next) => {
    const { displayName, email, password } = req.body;
    User.findOne({ where: { email } })
        .then((user) => {
            if (user) {
                // REF: https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
                res.status(409).json({ message: '註冊失敗！帳號已存在!'});
            } else {
                return bcryptjs.hash(password, 12)
                    .then((hashedPassword) => {
                        return User
                            .create({ displayName, email, password: hashedPassword })
                            .then(() => {
                                res.status(201).json({ message: '註冊成功！' });
                            })
                            .catch((err) => {
                                res.status(409).json({ message: '註冊失敗！'})
                            });
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                            err.errorMessage = '伺服器發生錯誤';
                        }
                        next(err);
                    })
            }
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            res.status(500).json({ errorMessage: '伺服器發生錯誤' })
        });
};

module.exports = {
    postLogin,
    postSignup
};