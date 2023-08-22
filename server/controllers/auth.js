import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //password 암호화
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      //암호화한 password를 db에 저장
      password: hash,
    });

    await newUser.save();
    res.status(200).json("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //사용자가 입력한 id에 해당하는 user이 존재하는지 확인한다.
    const user = await User.findOne({ id: req.body.id });
    //없다면 바로 user가 없다는 에러를 날린다.
    if (!user) return next(createError(404, "아이디가 존재하지 않습니다."));

    //user가 있다면 password가 정확한지 확인한다.
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    //비번이 틀렸다면 바로 에러를 날린다.
    if (!isPasswordCorrect)
      return next(createError(400, "비밀번호를 확인해주세요."));

    //비번이 맞다면 토큰 생성
    const token = jwt.sign(
      { uuid: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    //정확하다면 user 정보 반환
    const { id, password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true, //쿠키를 가로채지 못하도록 함
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
