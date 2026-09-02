const SERVICE_RULES = [
  {
    service: 'electrician',
    keywords: [
      'electrician', 'electrical', 'wiring', 'wire', 'switch', 'socket', 'plug',
      'fan', 'ceiling fan', 'light', 'bulb', 'short circuit', 'voltage', 'fuse',
      'mcb', 'meter', 'power', 'current', 'spark', 'sparking', 'fridge',
      'refrigerator', 'ac', 'a/c', 'air conditioner', 'air conditioning',
      'cooler', 'geyser', 'water heater', 'inverter', 'stabilizer', 'motor'
    ],
    min: 400,
    max: 1500
  },
  {
    service: 'plumber',
    keywords: [
      'plumber', 'plumbing', 'pipe', 'leak', 'leaking', 'tap', 'faucet', 'drain',
      'toilet', 'water', 'tank', 'cistern', 'flush', 'sewage', 'washbasin', 'sink'
    ],
    min: 350,
    max: 1400
  },
  {
    service: 'carpenter',
    keywords: [
      'carpenter', 'carpentry', 'wood', 'door', 'furniture', 'cabinet', 'table',
      'chair', 'shelf', 'bed', 'almirah', 'wardrobe', 'wooden', 'hinge', 'drawer'
    ],
    min: 500,
    max: 2500
  },
  {
    service: 'painter',
    keywords: [
      'painter', 'painting', 'paint', 'wall paint', 'wall', 'ceiling', 'colour',
      'color', 'whitewash', 'putty', 'distemper', 'texture'
    ],
    min: 600,
    max: 3000
  },
  {
    service: 'mason',
    keywords: [
      'mason', 'masonry', 'brick', 'cement', 'tile', 'floor', 'plaster', 'concrete',
      'construction', 'crack', 'wall construction'
    ],
    min: 700,
    max: 4000
  }
];

const analyzeService = async (req, res) => {
  try {
    const { text } = req.body;

    if (typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({
        message: 'Service description is required'
      });
    }

    const input = text.trim().toLowerCase();

    let best = null;
    let bestScore = 0;

    for (const rule of SERVICE_RULES) {
      const matches = rule.keywords.filter((keyword) => input.includes(keyword));

      if (matches.length > bestScore) {
        bestScore = matches.length;
        best = { ...rule, matches };
      }
    }

    if (!best) {
      return res.status(200).json({
        service: 'general service',
        confidence: 0,
        suggestedPrice: { min: 500, max: 2000, currency: 'INR' },
        matchedKeywords: []
      });
    }

    const confidence = Math.min(0.99, 0.55 + bestScore * 0.12);

    return res.status(200).json({
      service: best.service,
      confidence: Number(confidence.toFixed(2)),
      suggestedPrice: { min: best.min, max: best.max, currency: 'INR' },
      matchedKeywords: best.matches
    });
  } catch (error) {
    console.error('Service analysis error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { analyzeService };
