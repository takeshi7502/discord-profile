const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const CONFIG_FILE = path.join(__dirname, 'config.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from root directory

// Helper function to read config
async function readConfig() {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config:', error);
    throw error;
  }
}

// Helper function to write config
async function writeConfig(config) {
  try {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing config:', error);
    throw error;
  }
}

// API Routes

// GET - Fetch current config
app.get('/api/config', async (req, res) => {
  try {
    const config = await readConfig();
    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to read config'
    });
  }
});

// POST - Update entire config
app.post('/api/config', async (req, res) => {
  try {
    const newConfig = req.body;
    await writeConfig(newConfig);
    res.json({
      success: true,
      message: 'Config updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update config'
    });
  }
});

// PATCH - Update specific section
app.patch('/api/config/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const updates = req.body;
    
    const config = await readConfig();
    
    if (!config[section]) {
      return res.status(404).json({
        success: false,
        error: `Section '${section}' not found`
      });
    }
    
    config[section] = { ...config[section], ...updates };
    await writeConfig(config);
    
    res.json({
      success: true,
      message: `Section '${section}' updated successfully`,
      data: config[section]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update config section'
    });
  }
});

// GET - Fetch specific section
app.get('/api/config/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const config = await readConfig();
    
    if (!config[section]) {
      return res.status(404).json({
        success: false,
        error: `Section '${section}' not found`
      });
    }
    
    res.json({
      success: true,
      data: config[section]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to read config section'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api/config`);
  console.log(`🎨 Admin panel at http://localhost:${PORT}/admin.html`);
  console.log(`🌐 Profile at http://localhost:${PORT}/index.html`);
});
