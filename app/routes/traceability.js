var US = require('../models/userStory').model;

exports.AddCommitToUs = function (req, res) {
    US.findById(req.params.id, function (err, us) {
        if (!err) {
            if (us) {
                if (req.body.commit)
                    us.commit = req.body.commit;
                us.save();
                res.status(200).send(us);
            }
            else
                res.status(404).send(err);
        }
        else {
            console.error(err);
            res.status(500).send(err);
        }
    });
};
