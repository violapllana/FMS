const Department = require('../models/department');


const addDepartment = async (req, res) => {
  try {
    const { name, director, location, email, phoneNumber } = req.body;

  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required and must be a non-empty string' });
    }



    const newDepartment = new Department({
      name: name.trim(),
      director,
      location,
      email,
      phoneNumber,
    });

    await newDepartment.save();

    res.status(201).json({ message: 'Department added successfully', department: newDepartment });
  } catch (err) {
    res.status(500).json({ message: 'Error adding department', error: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { name, director, location, email, phoneNumber } = req.body;
    const updateData = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name must be a non-empty string' });
      }
      updateData.name = name.trim();
    }
    if (director !== undefined) updateData.director = director;
    if (location !== undefined) updateData.location = location;
    if (email !== undefined) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

    const updatedDepartment = await Department.findByIdAndUpdate(req.params.departmentId, updateData, { new: true });

    if (!updatedDepartment) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json({ message: 'Department updated successfully', department: updatedDepartment });
  } catch (err) {
    res.status(500).json({ message: 'Error updating department', error: err.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching departments', error: err.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching department', error: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting department', error: err.message });
  }
};

module.exports = {
  addDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
