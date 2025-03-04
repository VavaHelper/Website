pipeline {
    agent any

    environment {
        // Variáveis de ambiente
        PNPM_VERSION = '8'
    }

    stages {
        stage('Checkout') {
            steps {
                // Realiza o checkout do código
                checkout scm
            }
        }

        stage('Setup PNPM') {
            steps {
                // Configura o pnpm
                script {
                    echo "Configurando PNPM versão ${PNPM_VERSION}"
                    sh 'npm install -g pnpm@${PNPM_VERSION}'
                }
            }
        }

        stage('Setup Node.js') {
            matrix {
                axes {
                    axis {
                        name 'NODE_VERSION'
                        values '20.x', '22.x'
                    }
                }
                stages {
                    stage('Install dependencies') {
                        steps {
                            script {
                                // Configura a versão do Node.js
                                echo "Usando Node.js versão ${NODE_VERSION}"
                                sh "nvm install ${NODE_VERSION}"
                                sh "nvm use ${NODE_VERSION}"
                                
                                // Instala as dependências
                                echo 'Instalando dependências...'
                                sh 'pnpm install --no-frozen-lockfile'
                            }
                        }
                    }

                    stage('Run Build') {
                        steps {
                            script {
                                // Executa o build
                                echo 'Executando build...'
                                sh 'pnpm build'
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executado com sucesso!'
        }

        failure {
            echo 'A execução do pipeline falhou.'
        }

        always {
            echo 'Este bloco sempre será executado, independentemente do sucesso ou falha.'
        }
    }
}
