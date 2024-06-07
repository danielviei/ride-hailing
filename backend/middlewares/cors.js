import cors from 'cors';

const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS.split (',');

const corsMiddleware = cors ({
  origin: function (origin, callback) {
    if (!origin || ACCEPTED_ORIGINS.includes (origin)) {
      return callback (null, true);
    }
    return callback (new Error ('Not allowed by CORS'));
  },
});

export default corsMiddleware;
