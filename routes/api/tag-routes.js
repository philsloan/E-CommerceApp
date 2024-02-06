const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try {
    // find all tags and include associated Product data
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });

    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get one tag by id
router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id` and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);

    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// update a tag by id
router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const [rowsAffected] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (rowsAffected > 0) {
      const updatedTag = await Tag.findByPk(req.params.id);

      res.status(200).json(updatedTag);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete a tag by id
router.delete('/:id', async (req, res) => {
  try {
    // delete one tag by its `id` value
    const rowsAffected = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (rowsAffected > 0) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
