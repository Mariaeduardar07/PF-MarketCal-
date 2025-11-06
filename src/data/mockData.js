// Mock data que será substituído pela API futura
export const mockInfluencerTasks = {
  instagram: [
    {
      id: 1,
      image: '/image/logo.png', // usando a imagem disponível
      title: 'Creating Awesome Mobile Apps',
      category: 'UI/UX Design',
      progress: 100,
      timeLeft: '1 Hour',
      daysLeft: null,
      teamMembers: [
        '/image/logo.png', // placeholder - futuramente virão da API
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png'
      ]
    },
    {
      id: 2,
      image: '/image/logo.png',
      title: 'Creating Fresh Website',
      category: 'Web Developer',
      progress: 65,
      timeLeft: '2 Hour',
      daysLeft: null,
      teamMembers: [
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png'
      ]
    },
    {
      id: 3,
      image: '/image/logo.png',
      title: 'Creating Color Palettes',
      category: 'UI/UX Design',
      progress: 100,
      timeLeft: '1 Hour',
      daysLeft: null,
      teamMembers: [
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png'
      ]
    },
    {
      id: 4,
      image: '/image/logo.png',
      title: 'Awesome Project',
      category: 'Web Development',
      progress: 78,
      timeLeft: '3 Hour',
      daysLeft: null,
      teamMembers: [
        '/image/logo.png',
        '/image/logo.png'
      ]
    }
  ],
  twitter: [
    {
      id: 5,
      image: '/image/logo.png',
      title: 'Creating Mobile App Design',
      category: 'UI/UX Design',
      progress: 78,
      timeLeft: null,
      daysLeft: '3 Days Left',
      teamMembers: [
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png'
      ]
    },
    {
      id: 6,
      image: '/image/logo.png',
      title: 'Creating Perfect Website',
      category: 'Web Developer',
      progress: 95,
      timeLeft: null,
      daysLeft: '4 Days Left',
      teamMembers: [
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png'
      ]
    },
    {
      id: 7,
      image: '/image/logo.png',
      title: 'Mobile App Design',
      category: 'UI/UX Design',
      progress: 67,
      timeLeft: null,
      daysLeft: '3 Days Left',
      teamMembers: [
        '/image/logo.png',
        '/image/logo.png',
        '/image/logo.png'
      ]
    },
    {
      id: 8,
      image: '/image/logo.png',
      title: 'Creating Brand Identity',
      category: 'Brand Designer',
      progress: 84,
      timeLeft: null,
      daysLeft: '1 Day Left',
      teamMembers: [
        '/image/logo.png',
        '/image/logo.png'
      ]
    }
  ]
};

// Função para simular chamada da API futura
export const fetchInfluencerTasks = async (platform = null) => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (platform) {
    return mockInfluencerTasks[platform] || [];
  }
  
  return mockInfluencerTasks;
};

// Função para atualizar progresso (futura integração com API)
export const updateTaskProgress = async (taskId, newProgress) => {
  // Simula chamada da API
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Aqui será a chamada real da API futuramente
  console.log(`Updating task ${taskId} progress to ${newProgress}%`);
  
  return { success: true, taskId, newProgress };
};