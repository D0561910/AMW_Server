import express from "express";

const router = express.Router();

const m = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024 // no larger than 10mb
    }
});

// API: Uploads Logo
router.post("/logoUpload", m.single("file"), function (req, res, next) {
    var sess = req.session;
    var loginUser = sess.loginUser;
    var userEmail = sess.userEmail;
    var prjId = sess.prjId;
    var projectName = sess.prj;
    var isLogined = !!loginUser;

    var db = firebase.database();
    var ref = db.ref(`/event/${prjId}`);
    var imgRef = ref.child(`/information/eventLogo`);

    if (!req.file) {
        res.render("dashss", {
            msg: "No File Upload",
            isLogined: isLogined,
            name: loginUser || "",
            email: userEmail || "",
            uid: sess.uid,
            prjname: projectName || "",
            prjId: prjId,
        });
    }

    // Create a new blob in the bucket and upload the file data.
    let newFileNames =
        "eventLOGO" + "-" + Date.now() + path.extname(req.file.originalname);
    const blob = bucket.file(newFileNames);

    // Make sure to set the contentType metadata for the browser to be able
    // to render the image instead of downloading the file (default behavior)
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobStream.on("error", (err) => {
        next(err);
        return;
    });

    blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        imgRef.push({
            imageUrl: publicUrl,
        });

        // Make the image public to the web (since we'll be displaying it in browser)
        blob.makePublic().then(() => {
            // Success !!!;
            // Image uploaded to ${publicUrl};
        });

        res.redirect("/dashss");
    });

    blobStream.end(req.file.buffer);
});

// API: Remove Logo
router.post("/logoRefresh", function (req, res, next) {
    var sess = req.session;
    // var project = sess.prjId;

    var db = firebase.database();
    var ref = db.ref("/event");
    var imgData = ref.child(`/${req.body.project}/information/eventLogo`);

    const promiseImageUrl = new Promise((resolve) => {
        imgData.on("value", function (snapshot) {
            var imgUri = snapshot.val();
            var imageHtml = "";
            for (let i in imgUri) {
                imageHtml +=
                    '<div class="col-lg-6s col-md-6 col-sm-6 col-xs-6 justify-content-md-center">';
                imageHtml += '<img class="img-thumbnail height-150" src="';
                imageHtml += imgUri[i].imageUrl;
                imageHtml += '"';
                imageHtml += 'itemprop="thumbnail" alt="Logo Image" />';
                imageHtml +=
                    '<button type="button" class="btn mr-1 mb-1 btn-danger btn-sm" ';
                imageHtml += 'name = "' + imgUri[i].imageUrl + '"';
                imageHtml += 'onclick = "return changeFreq(this)" > 刪除</button >';
                imageHtml += "</div>";
            }
            resolve(imageHtml);
        });
    });

    promiseImageUrl.then((response) => {
        res.send(response);
    });
});


// API: Refersh Logo
router.post("/logoDel", function (req, res, next) {
    var fileNAME = req.body.imgUrl;
    var delFileName = fileNAME.split("/", 5);

    var db = firebase.database();

    // Firebase Storage
    var buckets = firebase.storage().bucket();

    // Get a reference to our posts
    var ref = db.ref(`/event/${req.body.prjid}/information/eventLogo/`);

    const promiseGetKey = new Promise((resolve, reject) => {
        // Get the data.
        ref.on("value", function (snapshot) {
            var deletedPost = snapshot.val();
            var key = "Key Error";
            for (let i in deletedPost) {
                if (req.body.imgUrl === deletedPost[i].imageUrl) {
                    key = i;
                }
            }
            if (key !== "Key Error") {
                resolve(key);
            } else {
                reject("Images Delete Error");
            }
        });
        buckets.file(delFileName[4]).delete();
    });

    promiseGetKey
        .then((response) => {
            var deleteRef = db.ref(
                `/event/${req.body.prjid}/information/eventLogo/${response}`
            );
            deleteRef.remove();
            res.send("Deleted Successfully");
        })
        .catch((error) => {
            res.send(`${error} : Images Key Error `);
        });
});

export default router;