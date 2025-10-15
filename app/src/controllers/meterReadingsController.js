const meterReadingsService = require('../services/meterReadingsService');

/**
 * @swagger
 * /meter-readings:
 *   post:
 *     summary: Создание нового показания
 *     tags: [Meter Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               month:
 *                 type: string
 *                 example: "2025-09"
 *               previous_value:
 *                 type: integer
 *                 example: 100
 *               current_value:
 *                 type: integer
 *                 example: 200
 *               difference:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Показание создано
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 month:
 *                   type: string
 *                 previous_value:
 *                   type: integer
 *                 current_value:
 *                   type: integer
 *                 difference:
 *                   type: integer
 *       400:
 *         description: Ошибка валидации данных
 */
exports.createMeterReading = async (req, res) => {
  try {
    const meterReading = await meterReadingsService.create(req.body);
    res.status(201).json(meterReading);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании показания' });
  }
};

/**
 * @swagger
 * /meter-readings:
 *   get:
 *     summary: Получение всех показаний
 *     tags: [Meter Readings]
 *     responses:
 *       200:
 *         description: Список всех показаний
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   month:
 *                     type: string
 *                   previous_value:
 *                     type: integer
 *                   current_value:
 *                     type: integer
 *                   difference:
 *                     type: integer
 */
exports.getMeterReadings = async (req, res) => {
  try {
    const meterReadings = await meterReadingsService.getAll();
    res.json(meterReadings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении показаний' });
  }
};

/**
 * @swagger
 * /meter-readings/{id}:
 *   put:
 *     summary: Обновление показания по ID
 *     tags: [Meter Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID показания для обновления
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *               previous_value:
 *                 type: integer
 *               current_value:
 *                 type: integer
 *               difference:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Показание обновлено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 month:
 *                   type: string
 *                 previous_value:
 *                   type: integer
 *                 current_value:
 *                   type: integer
 *                 difference:
 *                   type: integer
 */
exports.updateMeterReading = async (req, res) => {
  try {
    const updated = await meterReadingsService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Показание не найдено' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при обновлении показания' });
  }
};

/**
 * @swagger
 * /meter-readings/{id}:
 *   delete:
 *     summary: Удаление показания по ID
 *     tags: [Meter Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID показания для удаления
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Показание удалено
 *       404:
 *         description: Показание не найдено
 */
exports.deleteMeterReading = async (req, res) => {
  try {
    const deleted = await meterReadingsService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Показание не найдено' });
    res.json({ message: 'Показание удалено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при удалении показания' });
  }
};
