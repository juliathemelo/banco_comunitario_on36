const axios = require('axios');

export class UtilsAdapter {

    allowedStates = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    async getEstadoByCep(cep: number): Promise<string> {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            
            if (response.data.erro) {
                throw new Error('CEP inválido.');
            }
            
            return response.data.uf;
        } catch (error) {
            console.error(`Erro ao verificar o CEP: ${error.message}`);
            throw error;
        }
    };
}