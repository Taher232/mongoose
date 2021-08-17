const mongoose = require("mongoose");

//connection
mongoose.connect(
    "mongodb://127.0.0.1:27017/foodDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(`db connecting ...`)
    );
    let ClientSchema = new mongoose.Schema({
        name: { type: String, required: true },
        age: Number,
    
        favoriteFoods: [String],
    });

    let client = mongoose.model("client", ClientSchema);

client.create(
    [
        { name: "Taher", age: 29, favoriteFoods: ["Lablabi", "burritos"] },
        {
            name: "Sonia",
            age: 24,
            favoriteFoods: ["Libanais", "Lablabi", "burritos"],
        },
        { name: "Aicha", age: 19, favoriteFoods: ["Libanais", "burritos"] },
        { name: "Oumayma", age:19, favoriteFoods: ["Libanais", "burritos"] },
    ],
    function (err, data) {
        if (err) return handleError(err);
        // saved!
        // console.log(data);
    }
);
const find = client.find();
const findById = client.findById(
    
    function (err, data) {
        if (err) return handleError(err);
        // console.log(data);
    }
);
findById.update({ $set: { name: "Taher Chabaane" } }, (err, updated) => {
    if (err) console.log("can not update");
});
client.findOneAndUpdate({ name: "Linda" }, { name: "Lynda" }, (err, data) => {
    if (err) console.log(err);
    // console.log(data);
});
client.findByIdAndRemove("610f1c8eb5bebf219cf069f4", (err, data) => {
    if (err) console.log(err);
    // console.log(data);
});

client.remove({ name: "Aicha" });

client
    .find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
        if (err) console.log(err);
        console.log(data);
    });


