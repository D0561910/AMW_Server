import express from 'express';

var router = express.Router();

// 退出登入
router.get("/logout", function (req, res, next) {
    // 備註：這裡用的 session-file-store 在destroy 方法裡，並沒有銷燬cookie 所以客戶端的 cookie 還是存在，導致的問題
    // --> 退出登陸後，服務端檢測到cookie 然後去查詢對應的 session 檔案，報錯 session-file-store 本身的bug
    req.session.destroy(function (err) {
        if (err) {
            res.json({ ret_code: 2, ret_msg: "退出登入失敗" });
            return;
        }
        // req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect("/");
    });
});

export default router