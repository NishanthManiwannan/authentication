function mongoserver(
  ejs,
  mongoose,
  passportLocalMongoose,
  GoogleStrategy,
  findOrCreate
) {
    
  mongoose.connect(process.env.LOCAL_HOST_MONGO, { useNewUrlParser: true });
  mongoose.set("useCreateIndex", true);

  const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String,
  });

  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);

  const User = new mongoose.model("User", userSchema);

  passport.use(User.createStrategy());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
        userProfileURL: process.env.USER_PROFILE_URL,
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);

        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );
}

module.exports = mongoserver ;
