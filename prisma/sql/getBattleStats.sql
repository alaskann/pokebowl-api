SELECT 
  name,
  wins,
  losses,
  ROUND(CAST(wins AS FLOAT) / NULLIF(losses, 0), 2) AS winLossRatio
FROM (
  SELECT 
    winner AS name,
    COUNT(*) AS wins,
    (
      SELECT COUNT(*) 
      FROM battles AS b2 
      WHERE b2.loser = b1.winner
    ) AS losses
  FROM battles AS b1
  GROUP BY winner
) AS battle_stats;
