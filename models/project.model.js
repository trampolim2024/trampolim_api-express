import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    nomeProjeto: {
        type: String,
        required: true,
        trim: true
    },
    nomeLider: {
        type: String,
        required: true,
        trim: true
    },
    integrantes: {
        type: [String], // Array com os nomes dos integrantes
        validate: [arr => arr.length <= 4, 'Máximo de 4 integrantes além do líder']
    },
    estagioIdeia: {
        type: String,
        enum: [
            'Conceitual (Pesquisa)/Ideação',
            'Em Desenvolvimento',
            'Protótipo de Baixa Fidelidade',
            'MVP sem clientes pagantes',
            'MVP com clientes pagantes'
        ],
        required: true
    },
    edital: {
        type: String,
        required: true,
        enum: ['Edital 2025.1', 'Edital 2025.2']
    },
    descricaoIdeia: {
        type: String,
        required: true,
        trim: true
    },
    diferencialInovacao: {
        type: String,
        required: true,
        trim: true
    },
    modeloNegocio: {
        type: String,
        required: true,
        trim: true
    },
    tecnologiasUtilizadas: {
        type: String,
        required: true,
        trim: true
    },
    linkPitch: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v); // Validação básica de URL
            },
            message: props => `${props.value} não é um link válido!`
        }
    },
}, {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
