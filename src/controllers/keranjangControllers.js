import { Keranjang } from "../models/keranjangModel";

export const getAllCart = (req, res, next) => {
  Keranjang.findOne({ idUser: req.body.idUser })
    .then((cart) => res.status(200).json(cart))
    .catch((err) => console.log(err));
};

//_id untuk test produk:
//5fe4b3fc5ef112b297fa81a1

export const addToCart = (req, res) => {
  const product = req.body;
  Keranjang.findOne({ idUser: req.body.idUser })
    .then((cart) => {
      const cartProductIndex = cart.listProduct.findIndex((cartProduct) => {
        return cartProduct.idProduct.toString() === product._id.toString();
      });

      let newQuantity = 1;
      const updatedCartItems = [...cart.listProduct];

      if (cartProductIndex >= 0) {
        newQuantity = cart.listProduct[cartProductIndex].qtyProduct + 1;
        updatedCartItems[cartProductIndex].qtyProduct = newQuantity;
      } else {
        updatedCartItems.push({
          idProduct: product._id,
          qtyProduct: newQuantity,
        });
      }

      cart.listProduct = updatedCartItems;
      res.status(200).json("Ok");
      return cart.save();
    })
    .catch((err) => console.log(err));
};

export const removeFromCart = (req, res) => {
  const idProduct = req.body._id;

  Keranjang.findOne({ idUser: req.body.idUser })
    .then((cart) => {
      const updatedCartItems = cart.listProduct.filter(
        (item) => item.idProduct.toString() !== idProduct.toString()
      );

      cart.listProduct = updatedCartItems;
      res.status(200).json("Ok");
      return cart.save();
    })
    .catch((err) => console.log(err));
};

// //Belum di Test
// export const addToCart = (req, res) => {
//   const newKeranjang = new Keranjang(req.body);
//   Keranjang.find({ idUser: req.body.idUser })
//     .then((keranjang) => {
//       if (!keranjang) {
//         newKeranjang.save((err) => {
//           return res
//             .status(200)
//             .json(keranjang, { message: "Successfull Add To Keranjang" });
//         });
//       }
//       return res.status(200).json({ message: "Produk Sudah Ada Di Keranjang" });
//     })
//     .catch((err) => console.error(err));
// };

// //Belum di test
// export const addReduceQtyProduct = (req, res) => {
//   try {
//     if (req.body.status === "add") {
//       const data = Keranjang.findOneAndUpdate(
//         {
//           idUser: req.body.idUser,
//           "listProduct.idProduct": req.body.idProduct,
//         },
//         {
//           $inc: {
//             "listProduct.$.qtyProduct": +1,
//           },
//         }
//       );
//       return res.status(200).json(data);
//     } else if (req.body.status === "reduce") {
//       const data = Keranjang.findOneAndUpdate(
//         {
//           idUser: req.body.idUser,
//           "listProduct.idProduct": req.body.idProduct,
//         },
//         {
//           $inc: {
//             "listProduct.$.qtyProduct": -1,
//           },
//         }
//       );
//       return res.status(200).json(data);
//     }
//   } catch (error) {
//     return res.status(401).json(error);
//   }
// };

// export const removeFromCart = (req, res) => {
//   try {
//     const findKeranjangUser = Keranjang.findOneAndUpdate(
//       {
//         idUser: req.body.idUser,
//       },
//       {
//         $pull: {
//           "listProduct.$.idProduct": req.body.idProduct,
//         },
//       }
//     );
//     console.log("Find Keranjang ->" + findKeranjangUser);
//     return res.status(200).json(findKeranjangUser);
//   } catch (error) {
//     return res.status(401).json(error);
//   }
// };

// export const editQtyFromCart = (req, res) => {
//   Keranjang.updateOne(
//     { idUser: req.params.idUser },
//     {
//       $set: { qty: req.body.qty },
//     },
//     (err) => {
//       if (err) {
//         res.send(err);
//       }
//       res.status(200).json({ message: "Successfull Remove From Keranjang" });
//     }
//   );
// };

