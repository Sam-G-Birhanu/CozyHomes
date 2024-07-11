app.get('/properties', async (req, res) => {
  try {
    const client = await pool.connect();
    const queryText = `
      SELECT 
        property.*, 
        address.street, 
        address.city, 
        address.region, 
        images.img_url
      FROM 
        property 
      JOIN 
        address ON property.prp_id = address.property_id 
      JOIN 
        images ON property.prp_id = images.property_id;
    `;
    const result = await client.query(queryText);
    const properties = result.rows;
    client.release();
    res.json(properties);
  } catch (err) {
    console.error('Error connecting to pool:', err);
    res.status(500).send('Internal Server Error');
  }
});