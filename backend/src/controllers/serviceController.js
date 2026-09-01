const SERVICE_RULES = [
  {
    service: 'electrician',
    keywords: ['electrician', 'wiring', 'wire', 'switch', 'socket', 'fan', 'light', 'short circuit', 'voltage', 'fuse'],
    min: 400,
    max: 1500
  },
  {
    service: 'plumber',
    keywords: ['plumber', 'pipe', 'leak', 'tap', 'faucet', 'drain', 'toilet', 'water'],
    min: 350,
    max: 1400
  },
  {
    service: 'carpenter',
    keywords: ['carpenter', 'wood', 'door', 'furniture', 'cabinet', 'table', 'chair', 'shelf'],
    min: 500,
    max: 2500
  },
  {
    service: 'painter',
    keywords: ['painter', 'paint', 'painting', 'wall', 'ceiling', 'colour', 'color'],
    min: 600,
    max: 3000
  },
  {
    service: 'mason',
    keywords: ['mason', 'brick', 'cement', 'tile', 'floor', 'plaster', 'concrete'],
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
      const matches = rule.keywords.filter((keyword) =>
        input.includes(keyword)
      );

      if (matches.length > bestScore) {
        bestScore = matches.length;
        best = { ...rule, matches };
      }
    }

    if (!best) {
      return res.status(200).json({
        service: 'general service',
        confidence: 0,
        suggestedPrice: {
          min: 500,
          max: 2000,
          currency: 'INR'
        },
        matchedKeywords: []
      });
    }

    const confidence = Math.min(
      0.99,
      0.55 + bestScore * 0.12
    );

    return res.status(200).json({
      service: best.service,
      confidence: Number(confidence.toFixed(2)),
      suggestedPrice: {
        min: best.min,
        max: best.max,
        currency: 'INR'
      },
      matchedKeywords: best.matches
    });
  } catch (error) {
    console.error('Service analysis error:', error);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = { analyzeService };