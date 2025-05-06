const { validationResult } = require("express-validator")
const {
    user,
    student,
    role,
    role_user,
    student_user
} = require("../models")
const bcryptjs = require('bcryptjs')
let self = {}

self.save = async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json(errors)
    }
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        classes,
        major_id,
        gender
    } = req.body

    const hashedPassword = await bcryptjs.hash(password, 10)
    const userData = await user.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    const studentData = await student.create({
        firstName: firstName,
        lastName: lastName,
        classes: classes,
        major_id: major_id,
        gender: gender
    })

    const roleStudent = await role.findOne({
        attributes: ["id"],
        where: {
            name: "Student"
        }
    })

    await role_user.create({
        user_id: userData.id,
        role_id: roleStudent.id
    })

    await student_user.create({
        user_id: userData.id,
        student_id: studentData.id
    })

    res.status(201).send({ message: 'Register Success!!' })
}

module.exports = self