import Contact from '../models/Contact.js'

// Submit Contact Form
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    // Create contact document
    const contact = await Contact.create({
      name,
      email,
      message,
    })

    // Send response
    res.status(201).json({
      success: true,
      message: 'Contact submission received successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message,
    })
  }
}

// Get all contacts (Admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message,
    })
  }
}

// Get single contact
export const getContact = async (req, res) => {
  try {
    const { id } = req.params
    const contact = await Contact.findById(id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    // Mark as read
    contact.status = 'read'
    await contact.save()

    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: error.message,
    })
  }
}

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params
    const contact = await Contact.findByIdAndDelete(id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message,
    })
  }
}

// Get dashboard stats
export const getStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments()
    const newContacts = await Contact.countDocuments({ status: 'new' })
    const respondedContacts = await Contact.countDocuments({ status: 'responded' })

    res.status(200).json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        respondedContacts,
        readContacts: totalContacts - newContacts,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message,
    })
  }
}
