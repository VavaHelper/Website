const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllAgents() {
  const response = await fetch(`${API_URL}/agents`);
  if (!response.ok) throw new Error('Erro ao buscar agentes');
  return response.json();
}

export async function getAgentByName(name) {
  const response = await fetch(`${API_URL}/agents/${name}`);
  if (!response.ok) throw new Error(`Erro ao buscar o agente ${name}`);
  return response.json();
}

export async function getAgentWithSkills(name) {
  const response = await fetch(`${API_URL}/agents/${name}/with-skills`);
  if (!response.ok) throw new Error(`Erro ao buscar habilidades do agente ${name}`);
  return response.json();
}
