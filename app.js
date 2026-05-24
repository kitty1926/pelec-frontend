const API_URL = 'https://pusasicho.pythonanywhere.com/api/tasks/';

async function fetchTasks() {
    const container = document.getElementById('tasks-container');
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response failure.');
        
        const tasks = await response.json();
        container.innerHTML = ''; 

        if (tasks.length === 0) {
            container.innerHTML = `<div class="col-span-2 bg-white text-center p-8 rounded-xl text-gray-400">No tasks found in the cloud database.</div>`;
            return;
        }

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200 flex flex-col justify-between";
            
            card.innerHTML = `
                <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${task.title || 'Untitled Record'}</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">${task.description || 'No description provided.'}</p>
                </div>
                <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                    <span class="text-xs text-gray-400 font-mono">ID: ${task.id}</span>
                    <span class="px-2.5 py-1 text-xs font-medium rounded-md ${task.is_completed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                        ${task.is_completed ? 'Completed' : 'Pending'}
                    </span>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `
            <div class="col-span-2 bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 text-center">
                <p class="font-semibold">Failed to load system data</p>
                <p class="text-xs mt-1 text-red-500">Check CORS settings on PythonAnywhere if this problem persists.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', fetchTasks);