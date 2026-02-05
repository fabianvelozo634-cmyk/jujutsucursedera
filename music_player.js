// ========== REPRODUCTOR DE MÚSICA JJK ==========

const musicLibrary = {
    openings: [
        {
            id: 'op1',
            title: 'Kaikai Kitan',
            artist: 'Eve',
            url: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468689844812386444/ytmp3free.cc_eve-mv-youtubemp3free.org.mp3?ex=69859841&is=698446c1&hm=11b56c5586765ce5d826cb1bc4381940e2071eced331af06413a70c717d8051a&', // Reemplazar con URLs reales
            duration: '3:38',
            type: 'opening',
            season: 1
        },
        {
            id: 'op2',
            title: 'Vivid Vice',
            artist: 'Who-ya Extended',
            url: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468689845407973530/ytmp3free.cc_jujutsu-kaisen-opening-2-vivid-vice-youtubemp3free.org.mp3?ex=69859842&is=698446c2&hm=034b158dbf314112841d422d3ea60bbd5c0cdb5ab44f0e92a8c2ec91c191d832&',
            duration: '3:27',
            type: 'opening',
            season: 2
        },
        {
            id: 'op3',
            title: 'Ao no Sumika',
            artist: 'Tatsuya Kitani',
            url: 'https://cdn.discordapp.com/attachments/1465647525766631585/1468689845751775396/ytmp3free.cc_tv2opop1156mbstbs28-youtubemp3free.org.mp3?ex=69859842&is=698446c2&hm=c18a5d27c3bad43067c03b2cde8bf1be4b821505fa4855ed5ff7cb33257f0c59&',
            duration: '3:44',
            type: 'opening',
            season: 2
        }
    ],
    endings: [
        {
            id: 'ed1',
            title: 'LOST IN PARADISE',
            artist: 'ALI feat. AKLO',
            url: '',
            duration: '3:14',
            type: 'ending',
            season: 1
        },
        {
            id: 'ed2',
            title: 'give it back',
            artist: 'Cö shu Nie',
            url: '',
            duration: '3:02',
            type: 'ending',
            season: 1
        },
        {
            id: 'ed3',
            title: 'more than words',
            artist: 'Hitsujibungaku',
            url: '',
            duration: '3:15',
            type: 'ending',
            season: 2
        }
    ],
    ost: [
        {
            id: 'ost1',
            title: 'Kaikai Kitan (Instrumental)',
            artist: 'OST',
            url: '',
            duration: '3:38',
            type: 'ost'
        },
        {
            id: 'ost2',
            title: 'Domain Expansion Theme',
            artist: 'OST',
            url: '',
            duration: '2:45',
            type: 'ost'
        },
        {
            id: 'ost3',
            title: 'Battle Theme',
            artist: 'OST',
            url: '',
            duration: '3:20',
            type: 'ost'
        }
    ]
};

class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentTrack = null;
        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.isShuffle = false;
        this.repeatMode = 'none'; // none, one, all
        this.volume = 0.7;
        
        this.initPlayer();
        this.setupEventListeners();
    }

    initPlayer() {
        this.audio.volume = this.volume;
        
        // Cargar todas las canciones en la playlist
        this.playlist = [
            ...musicLibrary.openings,
            ...musicLibrary.endings,
            ...musicLibrary.ost
        ];
    }

    setupEventListeners() {
        this.audio.addEventListener('ended', () => this.onTrackEnd());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    }

    play(trackId) {
        const track = this.findTrack(trackId);
        if (!track) return;

        if (track.url === '') {
            this.showMusicNotification('⚠️ Esta canción no está disponible aún');
            return;
        }

        this.currentTrack = track;
        this.currentIndex = this.playlist.findIndex(t => t.id === trackId);
        this.audio.src = track.url;
        this.audio.play();
        this.isPlaying = true;
        
        this.updatePlayerUI();
        this.showMusicNotification(`▶️ Reproduciendo: ${track.title}`);
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayerUI();
    }

    resume() {
        this.audio.play();
        this.isPlaying = true;
        this.updatePlayerUI();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayerUI();
    }

    next() {
        if (this.isShuffle) {
            this.currentIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        }
        
        this.play(this.playlist[this.currentIndex].id);
    }

    previous() {
        if (this.audio.currentTime > 3) {
            this.audio.currentTime = 0;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
            this.play(this.playlist[this.currentIndex].id);
        }
    }

    setVolume(value) {
        this.volume = value;
        this.audio.volume = value;
        localStorage.setItem('musicVolume', value);
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        this.showMusicNotification(this.isShuffle ? '🔀 Aleatorio activado' : '➡️ Aleatorio desactivado');
        this.updatePlayerUI();
    }

    toggleRepeat() {
        const modes = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];
        
        const messages = {
            'none': '➡️ Repetición desactivada',
            'one': '🔂 Repetir canción',
            'all': '🔁 Repetir playlist'
        };
        
        this.showMusicNotification(messages[this.repeatMode]);
        this.updatePlayerUI();
    }

    seek(percentage) {
        if (!this.currentTrack) return;
        this.audio.currentTime = (percentage / 100) * this.audio.duration;
    }

    onTrackEnd() {
        if (this.repeatMode === 'one') {
            this.audio.currentTime = 0;
            this.audio.play();
        } else if (this.repeatMode === 'all' || this.currentIndex < this.playlist.length - 1) {
            this.next();
        } else {
            this.stop();
        }
    }

    updateProgress() {
        if (!this.currentTrack) return;
        
        const progressBar = document.getElementById('musicProgress');
        const currentTimeSpan = document.getElementById('currentTime');
        
        if (progressBar && !isNaN(this.audio.duration)) {
            const percentage = (this.audio.currentTime / this.audio.duration) * 100;
            progressBar.style.width = percentage + '%';
        }
        
        if (currentTimeSpan) {
            currentTimeSpan.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updateDuration() {
        const durationSpan = document.getElementById('trackDuration');
        if (durationSpan && !isNaN(this.audio.duration)) {
            durationSpan.textContent = this.formatTime(this.audio.duration);
        }
    }

    updatePlayerUI() {
        const playBtn = document.getElementById('playPauseBtn');
        const trackTitle = document.getElementById('currentTrackTitle');
        const trackArtist = document.getElementById('currentTrackArtist');
        const shuffleBtn = document.getElementById('shuffleBtn');
        const repeatBtn = document.getElementById('repeatBtn');
        
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
        }
        
        if (this.currentTrack) {
            if (trackTitle) trackTitle.textContent = this.currentTrack.title;
            if (trackArtist) trackArtist.textContent = this.currentTrack.artist;
        }
        
        if (shuffleBtn) {
            shuffleBtn.style.color = this.isShuffle ? '#00ff00' : '#fff';
        }
        
        if (repeatBtn) {
            const icons = { 'none': '🔁', 'one': '🔂', 'all': '🔁' };
            repeatBtn.textContent = icons[this.repeatMode];
            repeatBtn.style.color = this.repeatMode !== 'none' ? '#00ff00' : '#fff';
        }
    }

    findTrack(trackId) {
        return this.playlist.find(track => track.id === trackId);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    showMusicNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(45deg, #8a2be2, #ff0066);
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
        }, 2000);
    }
}

// Crear modal del reproductor
function createMusicPlayerModal() {
    const modal = document.createElement('div');
    modal.id = 'musicPlayerModal';
    modal.className = 'modal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 85vh; overflow-y: auto;">
            <span class="close-btn" id="musicPlayerCloseBtn">&times;</span>
            <h2 style="color: #00ffff; text-align: center; margin-bottom: 30px;">🎵 Reproductor de Música</h2>
            
            <!-- Player Principal -->
            <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(255, 0, 102, 0.3)); padding: 30px; border-radius: 20px; margin-bottom: 30px; border: 2px solid #8a2be2;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div id="currentTrackTitle" style="font-size: 1.8rem; color: #fff; font-weight: bold; margin-bottom: 8px;">Selecciona una canción</div>
                    <div id="currentTrackArtist" style="font-size: 1.1rem; color: rgba(255, 255, 255, 0.7);">-</div>
                </div>
                
                <!-- Barra de Progreso -->
                <div style="margin: 25px 0; cursor: pointer;" id="progressBarContainer">
                    <div style="background: rgba(0, 0, 0, 0.5); height: 8px; border-radius: 10px; overflow: hidden; position: relative;">
                        <div id="musicProgress" style="height: 100%; width: 0%; background: linear-gradient(90deg, #8a2be2, #ff0066); border-radius: 10px; transition: width 0.1s;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.85rem; color: rgba(255, 255, 255, 0.7);">
                        <span id="currentTime">0:00</span>
                        <span id="trackDuration">0:00</span>
                    </div>
                </div>
                
                <!-- Controles -->
                <div style="display: flex; justify-content: center; align-items: center; gap: 25px; margin-bottom: 20px;">
                    <button id="shuffleBtn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #fff; transition: all 0.3s;">🔀</button>
                    <button id="prevBtn" style="background: none; border: none; font-size: 2rem; cursor: pointer; color: #fff; transition: all 0.3s;">⏮️</button>
                    <button id="playPauseBtn" style="background: linear-gradient(45deg, #8a2be2, #ff0066); border: none; width: 70px; height: 70px; border-radius: 50%; font-size: 2rem; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 20px rgba(138, 43, 226, 0.5); transition: all 0.3s;">▶️</button>
                    <button id="nextBtn" style="background: none; border: none; font-size: 2rem; cursor: pointer; color: #fff; transition: all 0.3s;">⏭️</button>
                    <button id="repeatBtn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #fff; transition: all 0.3s;">🔁</button>
                </div>
                
                <!-- Control de Volumen -->
                <div style="display: flex; align-items: center; gap: 15px; max-width: 300px; margin: 0 auto;">
                    <span style="font-size: 1.2rem;">🔊</span>
                    <input type="range" id="volumeSlider" min="0" max="100" value="70" style="flex: 1; height: 6px; border-radius: 10px; outline: none; background: rgba(138, 43, 226, 0.3); cursor: pointer;">
                </div>
            </div>
            
            <!-- Pestañas -->
            <div style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #8a2be2;">
                <button class="music-tab active" data-tab="openings" style="flex: 1; padding: 12px; background: none; border: none; color: #fff; font-size: 1rem; font-weight: bold; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;">Openings</button>
                <button class="music-tab" data-tab="endings" style="flex: 1; padding: 12px; background: none; border: none; color: #fff; font-size: 1rem; font-weight: bold; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;">Endings</button>
                <button class="music-tab" data-tab="ost" style="flex: 1; padding: 12px; background: none; border: none; color: #fff; font-size: 1rem; font-weight: bold; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s;">OST</button>
            </div>
            
            <!-- Listas de Canciones -->
            <div id="openingsList" class="music-list"></div>
            <div id="endingsList" class="music-list" style="display: none;"></div>
            <div id="ostList" class="music-list" style="display: none;"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// Renderizar lista de canciones
function renderMusicList(container, tracks) {
    container.innerHTML = tracks.map(track => `
        <div class="music-item" data-track-id="${track.id}" style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            background: rgba(138, 43, 226, 0.2);
            border: 2px solid rgba(138, 43, 226, 0.3);
            border-radius: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s;
        ">
            <div style="flex: 1;">
                <div style="font-size: 1.1rem; font-weight: bold; color: #fff; margin-bottom: 5px;">${track.title}</div>
                <div style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">${track.artist}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">${track.duration}</span>
                <button class="play-track-btn" style="background: linear-gradient(45deg, #8a2be2, #ff0066); border: none; width: 45px; height: 45px; border-radius: 50%; color: #fff; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">▶️</button>
            </div>
        </div>
    `).join('');
    
    // Event listeners para cada canción
    container.querySelectorAll('.music-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(138, 43, 226, 0.4)';
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(138, 43, 226, 0.2)';
            this.style.transform = 'translateX(0)';
        });
        
        const playBtn = item.querySelector('.play-track-btn');
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const trackId = item.dataset.trackId;
            musicPlayer.play(trackId);
        });
        
        item.addEventListener('click', () => {
            const trackId = item.dataset.trackId;
            musicPlayer.play(trackId);
        });
    });
}

// Inicializar reproductor
let musicPlayer;

function initMusicPlayer() {
    const modal = createMusicPlayerModal();
    musicPlayer = new MusicPlayer();
    
    // Renderizar listas
    renderMusicList(document.getElementById('openingsList'), musicLibrary.openings);
    renderMusicList(document.getElementById('endingsList'), musicLibrary.endings);
    renderMusicList(document.getElementById('ostList'), musicLibrary.ost);
    
    // Event listeners de controles
    document.getElementById('playPauseBtn').addEventListener('click', () => {
        if (musicPlayer.isPlaying) {
            musicPlayer.pause();
        } else if (musicPlayer.currentTrack) {
            musicPlayer.resume();
        } else {
            musicPlayer.play(musicPlayer.playlist[0].id);
        }
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => musicPlayer.previous());
    document.getElementById('nextBtn').addEventListener('click', () => musicPlayer.next());
    document.getElementById('shuffleBtn').addEventListener('click', () => musicPlayer.toggleShuffle());
    document.getElementById('repeatBtn').addEventListener('click', () => musicPlayer.toggleRepeat());
    
    // Control de volumen
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', (e) => {
        musicPlayer.setVolume(e.target.value / 100);
    });
    
    // Barra de progreso
    const progressContainer = document.getElementById('progressBarContainer');
    progressContainer.addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        musicPlayer.seek(percentage);
    });
    
    // Pestañas
    document.querySelectorAll('.music-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover active de todos
            document.querySelectorAll('.music-tab').forEach(t => {
                t.classList.remove('active');
                t.style.borderBottomColor = 'transparent';
            });
            
            // Activar actual
            this.classList.add('active');
            this.style.borderBottomColor = '#8a2be2';
            
            // Mostrar lista correspondiente
            document.querySelectorAll('.music-list').forEach(list => list.style.display = 'none');
            const tabName = this.dataset.tab;
            document.getElementById(`${tabName}List`).style.display = 'block';
        });
    });
    
    // Cerrar modal
    document.getElementById('musicPlayerCloseBtn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cargar volumen guardado
    const savedVolume = localStorage.getItem('musicVolume');
    if (savedVolume) {
        volumeSlider.value = parseFloat(savedVolume) * 100;
        musicPlayer.setVolume(parseFloat(savedVolume));
    }
}

// Función para abrir el reproductor
function openMusicPlayer() {
    const modal = document.getElementById('musicPlayerModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Inicializar cuando cargue la página
window.addEventListener('load', initMusicPlayer);

// Exportar funciones
window.openMusicPlayer = openMusicPlayer;
window.musicPlayer = musicPlayer;

// este es el music_player.js