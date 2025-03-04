pipeline {
    agent any

    stages {
        stage('Preparação') {
            steps {
                script {
                    // Clonar o repositório
                    echo 'Clonando o repositório...'
                }
            }
        }

        stage('Instalar dependências') {
            steps {
                script {
                    // Instalar dependências do Node.js
                    echo 'Instalando dependências...'
                    sh 'npm install'
                }
            }
        }

        stage('Rodar testes') {
            steps {
                script {
                    // Rodar os testes do Node.js
                    echo 'Rodando os testes...'
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Rodar o build do Node.js (se necessário)
                    echo 'Executando o build...'
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
        success {
            echo 'Pipeline executado com sucesso!'
        }
        failure {
            echo 'Ocorreu um erro durante o pipeline.'
        }
    }
}
