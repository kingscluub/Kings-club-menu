const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// تقديم ملف index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 👇 حط هنا بيانات Pantry بتاعتك بعد ما تعمل الحساب
const PANTRY_BASKET_ID = 'ضع-الباسكيت-اي-دي-هنا';
const PANTRY_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_BASKET_ID}/basket/menu-data`;

// جلب المنيو
app.get('/api/menu', async (req, res) => {
  try {
    const response = await fetch(PANTRY_URL);
    if (!response.ok) throw new Error('Pantry fetch failed');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json([]);
  }
});

// حفظ المنيو
app.post('/api/menu', async (req, res) => {
  try {
    await fetch(PANTRY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// تسجيل دخول الأدمن
const ADMIN_PASSWORD = 'kings2026';
app.post('/api/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});