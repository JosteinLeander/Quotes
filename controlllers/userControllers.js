const User = require("../models/user");
const Quote = require("../models/quotes");
const { generateToken, verifyUser } = require("../middleware/auth");
const bcrypt = require("bcrypt");

// index
exports.index = async (req, res) => {
    const filter = {  };
    //const quote = await Quote.find(filter).sort({ dato: -1 }).limit(5);
    const quoteList = await Quote.find(filter);
    const random = Math.floor(Math.random() * quoteList.length);
    let quote = quoteList[random];
    console.log(quote);
    res.render("index.ejs", {user: "", title: "hjem", quote: quote})
};

// Logg inn
exports.login =  (req, res) => {
    res.render("sign-in.ejs", { title: "Sign in", user: "", feedback: "" });
  };

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const payload = { userId: user._id };
                const token = generateToken(payload);
                res.cookie("token", token, { httpOnly: true });
                res.redirect("/home/" + username, { title: "User home", user: username, quote: "" }, 200);
            } else {
                let feedback = "Wrong password";
                res.render("sign-in.ejs", { title: "Sign in", user: "", feedback: feedback });
            }
        } else {
            console.log("Brukeren finnes ikke");
            let feedback = "User does not exist";
            res.render("sign-in.ejs", { title: "Sign in", user: "", feedback: feedback });
        }
    }
    catch (err) {
        console.log(err);
        let feedback = "Error occured while signing in";
        res.render("sign-in.ejs", { title: "Sign in", user: "", feedback: feedback });
    }
};

// Lag ny bruker
exports.signup = (req, res) => {
    res.render("sign-up.ejs", { title: "Sign up", user: "", feedback: "" });
};

exports.registrerUser = async (req, res) => {
const { username, password, password2 } = req.body;
console.log(username, password, password2);
if (password != password2) {
    let feedback = "Passwords does not match";
    res.render("sign-up.ejs", { title: "Sign up", user: "", feedback: feedback });
} else {
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hash });
        const payload = { userId: user._id };
        const token = generateToken(payload);
        res.cookie("token", token, { httpOnly: true });

        res.redirect("/home/" + username, { title: "User home", user: username, quote: "" }, 200);
    }
    catch (err) {
        console.log(err.message);
        let feedback = "User already exists";
        res.render("sign-up.ejs", { title: "Sign up", user: "", feedback: feedback });
    }
}
};

// Legg til quote
exports.homeUser = async (req, res) => {
    //Kaller en funksjon for å sjekke om brukeren som prøver å komme inn på siden har lov (true/false)
    let allowToSee = await verifyUser(req);

    if (!allowToSee) {
        console.log("Bruker har ikke tilgang");
        const filter = {  };
        const quoteList = await Quote.find(filter);
        const random = Math.floor(Math.random() * quoteList.length);
        let quote = quoteList[random];
        console.log(quote);
        res.redirect("/", {user: "", title: "hjem", quote: quote}, 200);
    } else {
        let user = req.params.user;
        console.log(user);
        const filter = { user: user };
        const quoteList = await Quote.find(filter);
        res.render("userhome.ejs", { title: "User home", user: user, quote: quoteList });
    }
};

exports.addquote = async (req, res) => {
    const { username, quoteitem, quoteorigin } = req.body;
    console.log(username, quoteitem, quoteorigin);
    const user = username;
    try {
        const quote = await Quote.create({ user, quoteitem, quoteorigin });
        const filter = { user: user };
        const quoteList = await Quote.find(filter);
        console.log(quoteList);
        res.render("userhome.ejs", { title: "User home", user: username, quote: quoteList });
    }
    catch (err) {
        console.log(err.message);
        const filter = { user: user };
        const quoteList = await Quote.find(filter);
        res.render("userhome.ejs", { title: "User home", user: username, quote: quoteList });
    }
};

exports.editquote = async (req, res) => {
    const { username, quoteitem, quoteorigin } = req.body;
    const user = username;
    try {
        const quote = await Quote.updateOne({ user, quoteitem, quoteorigin });
        const filter = { user: user };
        const quoteList = await Quote.find(filter);
        res.render("userhome.ejs", { title: "User home", user: username, quote: quoteList });
    }
    catch (err) {
        console.log(err.message);
        const filter = { user: user };
        const quoteList = await Quote.find(filter);
        res.render("userhome.ejs", { title: "User home", user: username, quote: quoteList });
    };
};

// Andre lister
exports.otherquote = async (req, res) => {
    let user = req.params.user;
    console.log("HER", user);
    const filter = { user: user };
    const quoteList = await Quote.find(filter);
    res.render("otherquote.ejs", { title: "Other quote", user: user, quote: quoteList });
};

exports.logout = async (req, res) => {
    //Setter token til tom slik at brukeren er logget ut
    res.cookie('token', "", { httpOnly: true });
    const filter = { };
    const quoteList = await Quote.find(filter);
    const random = Math.floor(Math.random() * quoteList.length);
    let quote = quoteList[random];
    console.log(quote);
    res.redirect("/", {user: "", title: "hjem", quote: quote}, 200);
};

// user manual
exports.usermanual = async (req, res) => {

    
    res.render("index.ejs", { user: "", title: "hjem" })
};