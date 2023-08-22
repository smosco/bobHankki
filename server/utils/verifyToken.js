import jwt from "jsonwebtoken";
import { createError } from "./error.js";

//토큰 있는지 확인하는 미들웨어
export const verifyToken = (req, res, next) => {
  //req의 쿠키에 담긴 access_token을 확인
  const token = req.cookies.access_token;
  //토큰 자체가 없으면 권한이 없다는 에러 보냄
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  //토큰이 유효한지 확인
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    //user는 로그인할때 암호화한 정보를 담은 토큰을 해독한 것으로
    //{uuid : , isAdmin : }이다.
    req.user = user;
    next();
  });
};

//user 삭제할때 클라이언트에서 넘어온 id와 토큰에 저장된 uuid가 같은지 확인
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.userId === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//관리자인지 채크
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
