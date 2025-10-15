const express = require('express');
const router = express.Router();
const controller = require('../controllers/meterReadingsController');

// Создание показания
router.post('/', controller.createMeterReading);

// Получение всех показаний
router.get('/', controller.getMeterReadings);

// Обновление показания
router.put('/:id', controller.updateMeterReading);

// Удаление показания
router.delete('/:id', controller.deleteMeterReading);

module.exports = router;
