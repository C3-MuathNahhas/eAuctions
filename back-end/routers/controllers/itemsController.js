const connection = require("../../db/db");

const getAllItems = (req, res) => {
  const query = `SELECT * FROM items where is_deleted = 0 AND owner_id=?`;
  connection.query(query, [req.token.userId], (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    // if (result.length===0) {
    //     return res.status(400).json({
    //       success: false,
    //       message: `there is no item added yet`,
    //     });
    //   }
    res.status(200).json({
      success: true,
      message: `All the items`,
      items: result,
    });
  });
};

const getItemsByID = (req, res) => {
  const { itemId } = req.params;
  const query = `SELECT items.title, items.item_id , items.owner_id ,items.details, items.image ,users.user_name FROM items  JOIN users  ON items.owner_id=users.user_id WHERE items.is_deleted = 0 AND items.item_id = ${itemId}`;
  connection.query(query, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: `the item with id ${itemId} is not exist`,
      });
    }
    res.status(200).json({
      success: true,
      message: `the item with id ${itemId}`,
      item: result,
    });
  });
};

const deleteItemById = (req, res) => {
  const { itemId } = req.params;
  const query = `UPDATE items SET is_deleted =1 WHERE item_id =${itemId} AND is_deleted=0`;
  connection.query(query, (err, result, fields) => {
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `the item with id ${itemId} is not exist`,
      });
    }
    res.status(202).json({
      success: true,
      message: `Success Delete item with id => ${itemId}`,
    });
  });
};

const createNewItem = (req, res) => {
  const { title, details, image } = req.body;
  const owner_id = req.token.userId;
if(!title){
  return res.status(400).json({
    success: false,
    message: `title is required`,
  });
}

  const newItem = [title, details, image, owner_id];
  const query = `INSERT INTO items (title, details, image,owner_id) values (?,?,?,?)`;
  connection.query(query, newItem, (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: ` Success new item added`,
      item: {
        item: {
          item_id: result.insertId,
          title: title,
          details: details,
          image: image,
          owner_id: owner_id,
        },
      },
    });
  });
};
module.exports = {
  getAllItems,
  createNewItem,
  getItemsByID,
  deleteItemById,
};
