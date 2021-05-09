'use strict';
'use strict';
const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    name:{type: String ,required:true},
    title:{type:String,required:true},
    moviesBasedOn:{type : String ,required:false},
})

const bookModel=mongoose.model('book',bookSchema);
module.exports=bookModel;

// class Book {
//     constructor() {
//         this.id = 0;
//         this.bookDb = [

//         ];
//     };
//     get(id) {
//         if (id) {
//             return this.bookDb.find(data => data.id === id)
//         } else {
//             return this.bookDb;
//         }
//     };
//     create(obj) {
//         let data = {
//             id: ++this.id,
//             data: obj
//         }
//         this.bookDb.push(data);
//         return data;
//     };
//     update(id,obj) {
//         for (let i = 0; i < this.bookDb.length; i++) {
//             if (this.bookDb[i].id == id) {
//                 this.bookDb[i].data = obj;
//                 return this.bookDb[i];
//             }
//         }
//     }
//     delete(id) {
//         let deleted = false;
//         this.bookDb = this.bookDb.filter(data => {
//             if (data.id != id) {
//                 return true;
//             } else {
//                 deleted = true;
//                 return false;
//             }
//         });
//         return deleted;
//     }
// }

// module.exports = Book;