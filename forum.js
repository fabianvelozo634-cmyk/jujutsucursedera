// ========== SISTEMA DE FORO GLOBAL (CON BACKEND) ==========

class ForumSystem {
    constructor(useBackend = true) {
        this.posts = [];
        this.useBackend = useBackend;
        this.loadPosts();
    }

    async loadPosts() {
        if (this.useBackend) {
            try {
                const response = await fetch('/api/forum/posts', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    this.posts = data.posts || [];
                } else {
                    console.error('Error cargando posts del servidor');
                    this.posts = [];
                }
            } catch (error) {
                console.error('Error en loadPosts:', error);
                this.posts = [];
            }
        } else {
            // Fallback a localStorage si el backend no está disponible
            const saved = localStorage.getItem('forumPosts');
            this.posts = saved ? JSON.parse(saved) : [];
        }
    }

    async savePosts() {
        if (this.useBackend) {
            try {
                await fetch('/api/forum/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ posts: this.posts })
                });
            } catch (error) {
                console.error('Error guardando posts:', error);
            }
        } else {
            localStorage.setItem('forumPosts', JSON.stringify(this.posts));
        }
    }

    createPost(author, content, authorAvatar = '👤') {
        const post = {
            id: Date.now(),
            author: author || 'Anónimo',
            authorAvatar: authorAvatar,
            content: content,
            timestamp: new Date().toISOString(),
            likes: 0,
            likedBy: [],
            replies: []
        };

        this.posts.unshift(post);
        this.savePosts();
        return post;
    }

    addReply(postId, author, content, authorAvatar = '👤') {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return null;

        const reply = {
            id: Date.now(),
            author: author || 'Anónimo',
            authorAvatar: authorAvatar,
            content: content,
            timestamp: new Date().toISOString(),
            likes: 0,
            likedBy: []
        };

        post.replies.push(reply);
        this.savePosts();
        return reply;
    }

    likePost(postId, userId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return false;

        if (post.likedBy.includes(userId)) {
            post.likedBy = post.likedBy.filter(id => id !== userId);
            post.likes--;
        } else {
            post.likedBy.push(userId);
            post.likes++;
        }

        this.savePosts();
        return true;
    }

    likeReply(postId, replyId, userId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return false;

        const reply = post.replies.find(r => r.id === replyId);
        if (!reply) return false;

        if (reply.likedBy.includes(userId)) {
            reply.likedBy = reply.likedBy.filter(id => id !== userId);
            reply.likes--;
        } else {
            reply.likedBy.push(userId);
            reply.likes++;
        }

        this.savePosts();
        return true;
    }

    deletePost(postId, userId) {
        const postIndex = this.posts.findIndex(p => p.id === postId);
        if (postIndex === -1) return false;

        // Verificar que el usuario sea el autor
        if (this.posts[postIndex].author !== userId) return false;

        this.posts.splice(postIndex, 1);
        this.savePosts();
        return true;
    }

    getPosts(limit = 20) {
        return this.posts.slice(0, limit);
    }

    formatTimestamp(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Justo ahora';
        if (diffMins < 60) return `Hace ${diffMins} min`;
        if (diffHours < 24) return `Hace ${diffHours}h`;
        if (diffDays < 7) return `Hace ${diffDays}d`;
        
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
}

// Crear modal del foro
function createForumModal() {
    const modal = document.createElement('div');
    modal.id = 'forumModal';
    modal.className = 'modal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;">
            <span class="close-btn" id="forumCloseBtn">&times;</span>
            <h2 style="color: #00ffff; text-align: center; margin-bottom: 20px;">💬 Foro Global de la Comunidad</h2>
            
            <!-- Crear Post -->
            <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(255, 0, 102, 0.3)); padding: 20px; border-radius: 15px; margin-bottom: 20px; border: 2px solid #8a2be2;">
                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <input type="text" id="forumUsername" placeholder="Tu nombre (opcional)" maxlength="20" style="
                        flex: 0 0 200px;
                        padding: 12px;
                        background: rgba(0, 0, 0, 0.5);
                        border: 2px solid #8a2be2;
                        border-radius: 10px;
                        color: #fff;
                        font-size: 0.95rem;
                        outline: none;
                    ">
                    <select id="forumAvatar" style="
                        flex: 0 0 80px;
                        padding: 12px;
                        background: rgba(0, 0, 0, 0.5);
                        border: 2px solid #8a2be2;
                        border-radius: 10px;
                        color: #fff;
                        font-size: 1.2rem;
                        outline: none;
                        cursor: pointer;
                    ">
                        <option value="👤">👤</option>
                        <option value="😎">😎</option>
                        <option value="👹">👹</option>
                        <option value="♾️">♾️</option>
                        <option value="⚡">⚡</option>
                        <option value="🔮">🔮</option>
                        <option value="💀">💀</option>
                        <option value="🌀">🌀</option>
                    </select>
                </div>
                <textarea id="forumPostContent" placeholder="Escribe algo interesante... (visible para TODOS)" maxlength="500" style="
                    width: 100%;
                    min-height: 100px;
                    padding: 15px;
                    background: rgba(0, 0, 0, 0.5);
                    border: 2px solid #8a2be2;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 0.95rem;
                    font-family: Arial, sans-serif;
                    resize: vertical;
                    outline: none;
                    margin-bottom: 15px;
                "></textarea>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span id="charCount" style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem;">0 / 500</span>
                    <button id="postBtn" style="
                        background: linear-gradient(45deg, #8a2be2, #ff0066);
                        border: none;
                        padding: 12px 30px;
                        border-radius: 10px;
                        color: #fff;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s;
                    ">Publicar 📝</button>
                </div>
            </div>
            
            <!-- Lista de Posts -->
            <div id="forumPostsList" style="
                flex: 1;
                overflow-y: auto;
                padding-right: 10px;
            "></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// Renderizar post
function renderPost(post, forum, userId) {
    const isLiked = post.likedBy.includes(userId);
    const isAuthor = post.author === userId;
    
    const postElement = document.createElement('div');
    postElement.className = 'forum-post';
    postElement.style.cssText = `
        background: rgba(138, 43, 226, 0.2);
        border: 2px solid rgba(138, 43, 226, 0.3);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 15px;
        transition: all 0.3s;
    `;
    
    postElement.innerHTML = `
        <div style="display: flex; gap: 15px;">
            <div style="font-size: 2rem; flex-shrink: 0;">${post.authorAvatar}</div>
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div>
                        <strong style="color: #00ffff; font-size: 1.05rem;">${escapeHtml(post.author)}</strong>
                        <span style="color: rgba(255, 255, 255, 0.5); font-size: 0.85rem; margin-left: 10px;">🌍 Global • ${forum.formatTimestamp(post.timestamp)}</span>
                    </div>
                    ${isAuthor ? `<button class="delete-post-btn" data-post-id="${post.id}" style="
                        background: rgba(255, 0, 0, 0.3);
                        border: 1px solid rgba(255, 0, 0, 0.5);
                        padding: 5px 10px;
                        border-radius: 5px;
                        color: #ff6666;
                        cursor: pointer;
                        font-size: 0.8rem;
                    ">🗑️ Eliminar</button>` : ''}
                </div>
                <p style="color: #fff; margin: 12px 0; line-height: 1.5;">${escapeHtml(post.content)}</p>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="like-btn" data-post-id="${post.id}" style="
                        background: rgba(138, 43, 226, 0.3);
                        border: 1px solid rgba(138, 43, 226, 0.5);
                        padding: 8px 15px;
                        border-radius: 8px;
                        color: #fff;
                        font-size: 0.9rem;
                        cursor: pointer;
                    ">${isLiked ? '❤️' : '🤍'} ${post.likes}</button>
                    <button class="reply-toggle-btn" data-post-id="${post.id}" style="
                        background: rgba(0, 255, 255, 0.3);
                        border: 1px solid rgba(0, 255, 255, 0.5);
                        padding: 8px 15px;
                        border-radius: 8px;
                        color: #fff;
                        font-size: 0.9rem;
                        cursor: pointer;
                    ">💬 ${post.replies.length}</button>
                </div>
            </div>
        </div>
        
        <!-- Respuestas -->
        <div class="replies-section" data-post-id="${post.id}" style="display: none; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(138, 43, 226, 0.3);">
            <div class="replies-list" style="margin-bottom: 15px; max-height: 200px; overflow-y: auto;"></div>
            <div style="display: flex; gap: 10px;">
                <textarea class="reply-input" placeholder="Escribe una respuesta..." maxlength="300" style="
                    flex: 1;
                    padding: 10px;
                    background: rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(138, 43, 226, 0.3);
                    border-radius: 8px;
                    color: #fff;
                    font-size: 0.9rem;
                    resize: vertical;
                    outline: none;
                    min-height: 50px;
                "></textarea>
                <button class="send-reply-btn" data-post-id="${post.id}" style="
                    background: rgba(0, 255, 255, 0.3);
                    border: 1px solid rgba(0, 255, 255, 0.5);
                    padding: 10px 20px;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 0.9rem;
                    cursor: pointer;
                ">📤</button>
            </div>
        </div>
    `;
    
    // Renderizar respuestas
    const repliesList = postElement.querySelector('.replies-list');
    post.replies.forEach(reply => {
        const replyElement = document.createElement('div');
        const isReplyLiked = reply.likedBy.includes(userId);
        
        replyElement.style.cssText = `
            background: rgba(0, 0, 0, 0.3);
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 10px;
            border-left: 3px solid #00ffff;
        `;
        
        replyElement.innerHTML = `
            <div style="display: flex; gap: 10px;">
                <span style="font-size: 1.5rem;">${reply.authorAvatar}</span>
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong style="color: #00ffff; font-size: 0.95rem;">${escapeHtml(reply.author)}</strong>
                        <span style="color: rgba(255, 255, 255, 0.4); font-size: 0.75rem;">${forum.formatTimestamp(reply.timestamp)}</span>
                    </div>
                    <p style="color: #fff; margin: 8px 0; font-size: 0.9rem;">${escapeHtml(reply.content)}</p>
                    <button class="like-reply-btn" data-post-id="${post.id}" data-reply-id="${reply.id}" style="
                        background: transparent;
                        border: none;
                        padding: 0;
                        color: ${isReplyLiked ? '#ff4081' : '#fff'};
                        font-size: 0.8rem;
                        cursor: pointer;
                        margin-top: 5px;
                    ">${isReplyLiked ? '❤️' : '🤍'} ${reply.likes}</button>
                </div>
            </div>
        `;
        
        repliesList.appendChild(replyElement);
    });
    
    return postElement;
}

// Escape HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Renderizar todos los posts
async function renderAllPosts(forum, userId) {
    const container = document.getElementById('forumPostsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Recargar posts del servidor
    await forum.loadPosts();
    const posts = forum.getPosts();
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: rgba(255, 255, 255, 0.5);">
                <div style="font-size: 4rem; margin-bottom: 20px;">💬</div>
                <div style="font-size: 1.2rem;">Aún no hay publicaciones</div>
                <div style="font-size: 0.9rem; margin-top: 10px;">¡Sé el primero en compartir algo!</div>
            </div>
        `;
        return;
    }
    
    posts.forEach(post => {
        const postElement = renderPost(post, forum, userId);
        container.appendChild(postElement);
    });
    
    // Event listeners
    setupPostEventListeners(forum, userId);
}

// Configurar event listeners de los posts
function setupPostEventListeners(forum, userId) {
    // Like posts
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = parseInt(this.dataset.postId);
            forum.likePost(postId, userId);
            renderAllPosts(forum, userId);
        });
    });
    
    // Toggle respuestas
    document.querySelectorAll('.reply-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const repliesSection = document.querySelector(`.replies-section[data-post-id="${postId}"]`);
            if (repliesSection) {
                repliesSection.style.display = repliesSection.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
    
    // Enviar respuesta
    document.querySelectorAll('.send-reply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = parseInt(this.dataset.postId);
            const repliesSection = document.querySelector(`.replies-section[data-post-id="${postId}"]`);
            const textarea = repliesSection.querySelector('.reply-input');
            const content = textarea.value.trim();
            
            if (!content) {
                showForumNotification('⚠️ Escribe una respuesta', 'warning');
                return;
            }
            
            const username = document.getElementById('forumUsername').value.trim() || 'Anónimo';
            const avatar = document.getElementById('forumAvatar').value;
            
            forum.addReply(postId, username, content, avatar);
            textarea.value = '';
            renderAllPosts(forum, userId);
            showForumNotification('✅ Respuesta publicada globalmente');
        });
    });
    
    // Like respuestas
    document.querySelectorAll('.like-reply-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = parseInt(this.dataset.postId);
            const replyId = parseInt(this.dataset.replyId);
            forum.likeReply(postId, replyId, userId);
            renderAllPosts(forum, userId);
        });
    });
    
    // Eliminar post
    document.querySelectorAll('.delete-post-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
                const postId = parseInt(this.dataset.postId);
                forum.deletePost(postId, userId);
                renderAllPosts(forum, userId);
                showForumNotification('🗑️ Publicación eliminada');
            }
        });
    });
}

// Notificación del foro
function showForumNotification(message, type = 'success') {
    const colors = {
        success: ['#8a2be2', '#ff0066'],
        warning: ['#ff8c00', '#ffd700'],
        error: ['#ff0000', '#8b0000']
    };
    
    const [color1, color2] = colors[type];
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(45deg, ${color1}, ${color2});
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 0.95rem;
        font-weight: bold;
        z-index: 10002;
        box-shadow: 0 5px 20px rgba(138, 43, 226, 0.6);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Inicializar foro
let forumSystem;
let currentUserId;

async function initForum() {
    const modal = createForumModal();
    
    // Detectar si el backend está disponible
    let useBackend = false;
    try {
        const response = await fetch('/api/health');
        useBackend = response.ok;
    } catch (error) {
        console.warn('Backend no disponible, usando localStorage');
        useBackend = false;
    }
    
    forumSystem = new ForumSystem(useBackend);
    
    // Generar o recuperar ID de usuario
    currentUserId = localStorage.getItem('forumUserId') || `user_${Date.now()}`;
    localStorage.setItem('forumUserId', currentUserId);
    
    // Event listener para crear post
    const postBtn = document.getElementById('postBtn');
    const postContent = document.getElementById('forumPostContent');
    const charCount = document.getElementById('charCount');
    const username = document.getElementById('forumUsername');
    const avatar = document.getElementById('forumAvatar');
    
    // Contador de caracteres
    postContent.addEventListener('input', () => {
        charCount.textContent = `${postContent.value.length} / 500`;
    });
    
    // Publicar post
    postBtn.addEventListener('click', () => {
        const content = postContent.value.trim();
        
        if (!content) {
            showForumNotification('⚠️ Escribe algo antes de publicar', 'warning');
            return;
        }
        
        if (content.length < 10) {
            showForumNotification('⚠️ El post debe tener al menos 10 caracteres', 'warning');
            return;
        }
        
        const authorName = username.value.trim() || 'Anónimo';
        const authorAvatar = avatar.value;
        
        forumSystem.createPost(authorName, content, authorAvatar);
        postContent.value = '';
        charCount.textContent = '0 / 500';
        
        renderAllPosts(forumSystem, currentUserId);
        const backendMsg = useBackend ? 'globalmente' : '(en este navegador)';
        showForumNotification(`✅ Publicación creada ${backendMsg}`);
    });
    
    // Cerrar modal
    document.getElementById('forumCloseBtn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Renderizar posts iniciales
    await renderAllPosts(forumSystem, currentUserId);
    
    // Actualizar posts cada 5 segundos si hay backend
    if (useBackend) {
        setInterval(() => {
            if (modal.style.display === 'block') {
                renderAllPosts(forumSystem, currentUserId);
            }
        }, 5000);
    }
}

// Función para abrir el foro
function openForum() {
    const modal = document.getElementById('forumModal');
    if (modal) {
        modal.style.display = 'block';
        renderAllPosts(forumSystem, currentUserId);
    }
}

// Inicializar cuando cargue la página
window.addEventListener('load', initForum);

// Exportar funciones
window.openForum = openForum;
window.forumSystem = forumSystem;