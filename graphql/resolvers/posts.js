const PostModel = require("../../models/Post")

// Resolvers define how to fetch the types defined in your schema
module.exports = {
    Query : {
        async getPosts(){
            try{
                const posts = await PostModel.find();
                return posts;

            }catch(err){
                throw new Error(err);
            }
        }
    }
};
