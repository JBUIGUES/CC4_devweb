import express from 'express';
const router = express.Router();

router.get('/:url', (req, res) => {
    const { url } = req.params;
    if (!linksDB[url]) {
      return res.status(404).json({ error: 'Lien introuvable' });
    }
    linksDB[url].visits++;
    res.json({ visits: linksDB[url].visits });
  });
  
export default router;
