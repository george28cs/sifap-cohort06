const MongoLib = require("../lib/mongo");
const MysqlLib = require("../lib/mysql");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

class UsersService {
  constructor() {
    this.collection = "sifap_users";
    this.mongoDB = new MongoLib();
    this.mysqlLib = new MysqlLib();
  }

  async createSuperAdminUser({ user }) {
    const { email, password, country, typeEmail } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "SA";
    const userId = nanoid(4);

    const response = await this.mysqlLib.createSuperAdminUser({
      userId,
      email,
      password: hashedPassword,
      typeEmail,
      country,
      role,
    });
    return response;
  }

  async addUser({ user }) {
    const {
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      dateOfBirth,
      city,
      state,
      country,
      taxReceiptLimit,
      fiscalId,
      createdAt,
      role,
      fiscalAct,
    } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = nanoid(4);

    const response = await this.mysqlLib.addUser({
      userId,
      email,
      password: hashedPassword,
      phoneNumber,
      firstName,
      lastName,
      dateOfBirth,
      city,
      state,
      country,
      taxReceiptLimit,
      fiscalId,
      createdAt,
      role,
      fiscalAct,
    });
    return response;
  }

  async getAllUsers() {
    const users = await this.mysqlLib.getAllUsers();
    return users;
  }

  async getUserById(id) {
    const user = await this.mysqlLib.getUserById(id);
    return user;
  }

  async getUserByMail({ email }) {
    try {
      const user = await this.mysqlLib.getUserByMail(email);
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById(id) {
    const user = await this.mysqlLib.removeUserByID(id);
    return user;
  }

  async sendResetLink(request) {
    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sifapcohot06@gmail.com",
        pass: "Platzinuncaparesdeaprender$",
      },
    });

    var mailOptions = {
      to: "luissol@hotmail.com",
      from: "passwordreset@demo.com",
      subject: "Sifap Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        http://${request.host}/reset/${request.token} 
        If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return info.response;
      }
    });
  }

  // CRUD Users Invitations
  async addUserInvited({ user }) {
    const { email, firstName, role } = user;
    const userId = nanoid(4);

    const response = await this.mysqlLib.addUserInvited({
      email,
      firstName,
      role,
      userId,
    });
    return response;
  }

  async getAllInvitedUsers() {
    const users = await this.mysqlLib.getInvitedUsers();
    return users;
  }

  async getInvitedUserById(id) {
    const user = await this.mysqlLib.getInvitedUserById(id);
    return user;
  }

  async deleteInvitedUserById(id) {
    const user = await this.mysqlLib.removeInvitedUserByID(id);
    return user;
  }
}

module.exports = UsersService;
