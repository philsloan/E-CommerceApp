const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });

    if (!categoryData || categoryData.length === 0) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get one category by id with associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// update a category by id
router.put('/:id', async (req, res) => {
  try {
    const [rowsAffected] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected > 0) {
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete a category by id
router.delete('/:id', async (req, res) => {
  try {
    const rowsAffected = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected > 0) {
      res.status(200).json({ status: `Deleted category with id = ${req.params.id}` });
    } else {
      res.status(404).json({ status: `No category found with id = ${req.params.id}` });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
