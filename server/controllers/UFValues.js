const UFValues = require('../models/UFValues');
const User = require('../models/User');
const Exceljs = require('exceljs');

exports.getAll = async (req, res, next) => {
  await UFValues.findAll({
    include: { model: User, as: 'user', attributes: { exclude: ['id'] } },
    order: [['id', 'desc']],
  })
    .then(data => res.status(200).send(data))
    .catch(error => console.error(error));
};

exports.store = async (req, res, next) => {
  const { body } = req;
  console.log(body);

  await UFValues.create({ ...body })
    .then(data => res.status(201).send('created'))
    .catch(error => console.error(error));
};

exports.downloadExcel = async (req, res, next) => {
  console.log('excel');
  await UFValues.findAll({ include: { model: User, as: 'user' } })
    .then(async data => {
      const buffer = await makeExcel(data);
      res.status(200).send(buffer);
    })
    .catch(error => console.error(error));
};

const makeExcel = async object => {
  const workbook = new Exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Registro de Conversiones', {
    properties: { outlineLevelRow: 1 },
  });

  const dateHourFormat = date => {
    const d = new Date(date);
    const dayHour = d.toLocaleString('es-CL', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return dayHour;
  };

  const data = await object?.map(item => {
    const date = dateHourFormat(item?.createdAt);
    return {
      createdAt: date,
      user: item?.user?.username,
      originAmount: item?.originAmount,
      conversionDate: item?.conversionDate,
      clpValue: item?.clpValue,
      conversionAmount: item?.conversionAmount,
    };
  });

  worksheet.getRow(3).values = [
    'FECHA Y HORA',
    'USUARIO',
    'MONTO ORIGEN',
    'FECHA CONVERSION',
    'VALOR MONEDA',
    'MONTO COVERSION',
  ];

  worksheet.columns = [
    { key: 'createdAt', width: 15 },
    { key: 'user', width: 8 },
    { key: 'originAmount', width: 14 },
    { key: 'conversionDate', width: 18 },
    { key: 'clpValue', width: 14 },
    { key: 'conversionAmount', width: 18 },
  ];

  data.forEach(element => {
    worksheet.addRow(element);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};
