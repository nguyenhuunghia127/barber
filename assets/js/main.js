document.addEventListener('DOMContentLoaded', () => {
            // --- Modal Handler ---
            const modalEl = document.getElementById('success-modal');
            const modalCard = document.getElementById('success-modal-card');

            const showModal = (message) => {
                const modalMsg = document.getElementById('success-modal-message');
                modalMsg.innerText = message;
                modalEl.classList.remove('hidden');
                modalEl.classList.add('flex');
                // Trigger reflow for CSS transition
                void modalEl.offsetWidth;
                modalEl.classList.remove('opacity-0');
                modalCard.classList.remove('scale-95');
                modalCard.classList.add('scale-100');
            };

            const closeModal = () => {
                modalEl.classList.add('opacity-0');
                modalCard.classList.remove('scale-100');
                modalCard.classList.add('scale-95');
                setTimeout(() => {
                    modalEl.classList.add('hidden');
                    modalEl.classList.remove('flex');
                }, 300);
            };

            document.getElementById('close-modal-btn').addEventListener('click', closeModal);
            // Close modal when clicking backdrop
            modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });


            // --- 0. XỬ LÝ CHUYỂN NGÔN NGỮ (LANGUAGE TOGGLE) ---
            const langToggleBtn = document.getElementById('lang-toggle');
            let currentLang = 'en'; // MẶC ĐỊNH LÀ TIẾNG ANH

            const applyLang = (lang) => {
                // Cập nhật html lang attribute
                document.getElementById('html-root').setAttribute('lang', lang);

                // Cập nhật chữ trên nút
                langToggleBtn.innerText = lang === 'en' ? 'VN' : 'EN';

                // Cập nhật toàn bộ các thẻ có class lang-el
                document.querySelectorAll('.lang-el').forEach(el => {
                    const newText = el.getAttribute(`data-${lang}`);
                    if (newText) el.innerHTML = newText;
                });

                // ĐỔI NGÔN NGỮ GOOGLE FORM (Đổi link iframe)
                const feedbackIframe = document.getElementById('feedback-form');
                if (feedbackIframe) {
                    const newUrl = feedbackIframe.getAttribute(`data-url-${lang}`);
                    if (newUrl) feedbackIframe.src = newUrl;
                }
            };

            if (langToggleBtn) {
                langToggleBtn.addEventListener('click', () => {
                    currentLang = currentLang === 'en' ? 'vi' : 'en';
                    applyLang(currentLang);
                });

                // Kích hoạt tiếng Anh mặc định ngay khi tải trang
                applyLang(currentLang);
            }

            // --- 1. XỬ LÝ MOBILE MENU ---
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            const links = document.querySelectorAll('.mobile-link');

            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });

            links.forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.add('hidden');
                });
            });


            // --- 2. XỬ LÝ NGÀY GIỜ BẰNG FLATPICKR (ĐỊNH DẠNG DD/MM/YYYY HẰNG 30 PHÚT) ---
            const datetimeInput = document.getElementById('cus_time');
            let flatpickrInstance = null;
            if (datetimeInput) {
                flatpickrInstance = flatpickr(datetimeInput, {
                    enableTime: true,          // Bật tính năng chọn giờ
                    dateFormat: "m/d/Y H:i",   // Ép định dạng Ngày/Tháng/Năm Giờ:Phút
                    minDate: "today",          // Không cho chọn ngày trong quá khứ
                    time_24hr: true,           // Hiển thị giờ định dạng 24h
                    minuteIncrement: 30,       // Bước nhảy chọn phút là 30 phút
                    minTime: "08:00",          // Giờ nhận khách sớm nhất (Sáng)
                    maxTime: "22:00",          // Giờ nhận khách muộn nhất (Tối)
                    formatDate: (date, formatStr) => {
                        const pad = (num) => String(num).padStart(2, '0');
                        const m = pad(date.getMonth() + 1);
                        const d = pad(date.getDate());
                        const y = date.getFullYear();
                        const h = pad(date.getHours());
                        const min = pad(date.getMinutes());
                        
                        // Tính giờ kết thúc (+30 phút)
                        const endDate = new Date(date.getTime() + 30 * 60 * 1000);
                        const eh = pad(endDate.getHours());
                        const emin = pad(endDate.getMinutes());
                        
                        return `${m}/${d}/${y} ${h}:${min} - ${eh}:${emin}`;
                    },
                    parseDate: (dateStr, formatStr) => {
                        if (!dateStr) return null;
                        const startPart = dateStr.split(" - ")[0];
                        const parts = startPart.split(" ");
                        if (parts.length < 2) return new Date(dateStr);
                        const dateParts = parts[0].split("/");
                        const timeParts = parts[1].split(":");
                        if (dateParts.length === 3 && timeParts.length === 2) {
                            return new Date(
                                parseInt(dateParts[2]),
                                parseInt(dateParts[0]) - 1,
                                parseInt(dateParts[1]),
                                parseInt(timeParts[0]),
                                parseInt(timeParts[1])
                            );
                        }
                        return new Date(dateStr);
                    }
                });
            }

            // --- 3. XỬ LÝ SUBMIT FORM ĐẶT LỊCH (GỬI QUA WEB3FORMS) ---
            const bookingForm = document.getElementById('booking-form');
            if (bookingForm) {
                bookingForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    const time = datetimeInput.value;
                    const submitBtn = this.querySelector('button[type="submit"]');

                    if (!time) {
                        // Shake the input to indicate error — no alert() needed
                        datetimeInput.style.borderColor = '#ef4444';
                        datetimeInput.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
                        datetimeInput.focus();
                        const errMsg = currentLang === 'en' ? 'Please select a date and time!' : 'Vui lòng chọn ngày và giờ dự kiến!';
                        datetimeInput.setAttribute('placeholder', errMsg);
                        setTimeout(() => {
                            datetimeInput.style.borderColor = '';
                            datetimeInput.style.boxShadow = '';
                            datetimeInput.setAttribute('placeholder', 'mm/dd/yyyy hh:mm - hh:mm');
                        }, 3000);
                        return;
                    }

                    const formData = new FormData(bookingForm);

                    submitBtn.innerText = currentLang === 'en' ? "SENDING INFO..." : "ĐANG GỬI THÔNG TIN...";
                    submitBtn.disabled = true;
                    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

                    fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                    })
                        .then(async (response) => {
                            let json = await response.json();
                            if (response.status == 200) {
                                const name = document.getElementById('cus_name').value;
                                const formattedTime = time.replace('T', ' ');

                                if (currentLang === 'en') {
                                    showModal(`Thank you ${name}.\n1997 Barber has recorded your appointment on: ${formattedTime}.\nWe will call you shortly to confirm.`);
                                } else {
                                    showModal(`Cảm ơn bạn ${name}.\n1997 Barber đã ghi nhận lịch hẹn của bạn vào: ${formattedTime}.\nChúng tôi sẽ sớm gọi lại để xác nhận.`);
                                }
                                bookingForm.reset();
                                // Reset flatpickr instance separately (form.reset() does not clear it)
                                if (flatpickrInstance) flatpickrInstance.clear();
                            } else {
                                console.error('Web3Forms error:', json);
                                const errText = currentLang === 'en' ? 'An error occurred, please try again later!' : 'Có lỗi xảy ra, vui lòng thử lại sau!';
                                showModal(errText);
                            }
                        })
                        .catch((error) => {
                            console.error('Network error:', error);
                            const networkErrText = currentLang === 'en' ? 'Network error! Please check your connection and try again.' : 'Lỗi kết nối mạng! Vui lòng kiểm tra kết nối và thử lại.';
                            showModal(networkErrText);
                        })
                        .finally(() => {
                            submitBtn.innerText = currentLang === 'en' ? "CONFIRM BOOKING" : "XÁC NHẬN ĐẶT LỊCH";
                            submitBtn.disabled = false;
                            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                        });
                });
            }

            // --- GOOGLE SHEETS REVIEWS ---
            let allReviews = [];

            const renderReviews = (reviews) => {
                const container = document.getElementById('review-container');
                if (!container) return;
                
                container.innerHTML = '';
                
                // Limit to max 15 reviews
                const reviewsToRender = reviews.slice(0, 15);

                if (reviewsToRender.length === 0) {
                    const noReviewText = currentLang === 'en' ? 'No reviews yet.' : 'Chưa có đánh giá nào.';
                    container.innerHTML = `<p class="text-slate-500 italic text-center w-full lang-el" data-vi="Chưa có đánh giá nào." data-en="No reviews yet.">${noReviewText}</p>`;
                    return;
                }

                reviewsToRender.forEach(row => {
                    const name = row.c[1].v;
                    const ratingStr = row.c[4].v;
                    const rating = parseInt(ratingStr.toString().charAt(0)) || 5;
                    const comment = row.c[5].v;

                    const starsHTML = '<span class="text-yellow-400 text-2xl">' + '★'.repeat(rating) + '</span><span class="text-slate-200 text-2xl">' + '★'.repeat(5 - rating) + '</span>';

                    const html = `
                        <div class="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-100 flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md shrink-0 w-[85vw] sm:w-[45vw] lg:w-[30vw] snap-center">
                            <div>
                                <div class="flex gap-1 tracking-widest">${starsHTML}</div>
                                <p class="mt-4 leading-7 text-slate-600 italic line-clamp-4">"${comment}"</p>
                            </div>
                            <div class="mt-6 flex items-center gap-3 pt-4 border-t border-slate-50">
                                <div class="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold uppercase">
                                    ${name.charAt(0)}
                                </div>
                                <p class="font-bold text-slate-900">${name}</p>
                            </div>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', html);
                });
            };

            const fetchReviews = async () => {
                const SHEET_ID = '1F6YAkHVe4AQq3_6ElJivWSOWcd3vAZlmuQ9vDz6vFwc';
                const gvizUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
                
                const container = document.getElementById('review-container');
                if (!container) return;

                try {
                    const response = await fetch(gvizUrl);
                    const textData = await response.text();

                    const jsonString = textData.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1];
                    const data = JSON.parse(jsonString);
                    let rows = data.table.rows;

                    allReviews = rows.filter(row => row.c && row.c[1] && row.c[4] && row.c[5]).reverse();
                    
                    renderReviews(allReviews);
                } catch (error) {
                    console.error('Lỗi khi tải đánh giá:', error);
                    const errorText = currentLang === 'en' ? 'Unable to load reviews at this time.' : 'Không thể tải đánh giá lúc này.';
                    container.innerHTML = `<p class="text-red-500 text-base col-span-3 text-center lang-el" data-vi="Không thể tải đánh giá lúc này." data-en="Unable to load reviews at this time.">${errorText}</p>`;
                }
            }

            const setupReviewFilters = () => {
                const btnLatest = document.getElementById('filter-latest');
                const btnBest = document.getElementById('filter-best');
                const btnWorst = document.getElementById('filter-worst');
                
                if(!btnLatest || !btnBest || !btnWorst) return;
                
                const buttons = [btnLatest, btnBest, btnWorst];
                
                const setActiveBtn = (activeBtn) => {
                    buttons.forEach(btn => {
                        btn.classList.remove('bg-blue-600', 'text-white');
                        btn.classList.add('bg-white', 'text-slate-700');
                    });
                    activeBtn.classList.remove('bg-white', 'text-slate-700');
                    activeBtn.classList.add('bg-blue-600', 'text-white');
                };

                btnLatest.addEventListener('click', () => {
                    setActiveBtn(btnLatest);
                    renderReviews(allReviews); // allReviews is already newest first (reversed)
                });
                
                btnBest.addEventListener('click', () => {
                    setActiveBtn(btnBest);
                    const bestReviews = [...allReviews].sort((a, b) => {
                        const ratingA = parseInt(a.c[4].v.toString().charAt(0)) || 5;
                        const ratingB = parseInt(b.c[4].v.toString().charAt(0)) || 5;
                        return ratingB - ratingA;
                    });
                    renderReviews(bestReviews);
                });
                
                btnWorst.addEventListener('click', () => {
                    setActiveBtn(btnWorst);
                    const worstReviews = [...allReviews].sort((a, b) => {
                        const ratingA = parseInt(a.c[4].v.toString().charAt(0)) || 5;
                        const ratingB = parseInt(b.c[4].v.toString().charAt(0)) || 5;
                        return ratingA - ratingB;
                    });
                    renderReviews(worstReviews);
                });
            };

            fetchReviews().then(() => {
                setupReviewFilters();
            });

            // --- AUTO SCROLL CAROUSELS ---
            const setupAutoScroll = (containerId) => {
                const container = document.getElementById(containerId);
                if (!container) return;
                
                let isPaused = false;
                let intervalId;
                let isDown = false;
                let startX;
                let scrollLeft;

                const startScroll = () => {
                    intervalId = setInterval(() => {
                        if (isPaused || isDown) return;
                        if (container.scrollWidth <= container.clientWidth) return;
                        
                        const maxScroll = container.scrollWidth - container.clientWidth;
                        if (container.scrollLeft >= maxScroll - 10) {
                            container.scrollTo({ left: 0, behavior: 'smooth' });
                        } else {
                            if (container.children.length > 0) {
                                const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
                                const cardWidth = container.children[0].offsetWidth + gap;
                                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                            }
                        }
                    }, 3500);
                };

                startScroll();

                const pause = () => { isPaused = true; };
                const resume = () => { isPaused = false; };

                container.addEventListener('mouseenter', pause);
                container.addEventListener('mouseleave', resume);
                container.addEventListener('touchstart', pause, {passive: true});
                container.addEventListener('touchend', resume, {passive: true});

                // Mouse Drag to Scroll
                container.addEventListener('mousedown', (e) => {
                    isDown = true;
                    container.classList.add('cursor-grabbing');
                    startX = e.pageX - container.offsetLeft;
                    scrollLeft = container.scrollLeft;
                    pause();
                });
                container.addEventListener('mouseleave', () => {
                    isDown = false;
                    container.classList.remove('cursor-grabbing');
                    resume();
                });
                container.addEventListener('mouseup', () => {
                    isDown = false;
                    container.classList.remove('cursor-grabbing');
                    resume();
                });
                container.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - container.offsetLeft;
                    const walk = (x - startX) * 2; // Scroll-fast
                    container.scrollLeft = scrollLeft - walk;
                });
            };

            setTimeout(() => {
                setupAutoScroll('home-banner-track');
                setupAutoScroll('interior-track');
                setupAutoScroll('gallery-track');
                setupAutoScroll('review-container');
            }, 2000);

            // --- 5. SCROLL REVEAL ANIMATION ---
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target); // only animate once
                    }
                });
            }, { threshold: 0.12 });

            document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

            // --- 6. ACTIVE NAV LINK (highlight khi cuộn đến section) ---
            const sections = document.querySelectorAll('main section[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');

            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('nav-active');
                            if (link.getAttribute('href') === `#${entry.target.id}`) {
                                link.classList.add('nav-active');
                            }
                        });
                    }
                });
            }, { rootMargin: '-40% 0px -55% 0px' });

            sections.forEach(section => navObserver.observe(section));

            // --- 7. BACK TO TOP BUTTON ---
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 400) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                }, { passive: true });

                backToTopBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        });