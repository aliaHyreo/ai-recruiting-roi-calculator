/**
 * Animate numeric value from current to target
 * @param {string|jQuery} element - Element selector or jQuery object
 * @param {number} targetValue - Target value to animate to
 * @param {Object} options - Animation options
 */
function animateValue(element, targetValue, options = {}) {
    const $el = typeof element === 'string' ? $(element) : element;
    if (!$el.length) return;

    const duration = options.duration || 800; // milliseconds
    const easing = options.easing || 'easeOutCubic';
    const prefix = options.prefix || '';
    const suffix = options.suffix || '';
    const decimals = options.decimals !== undefined ? options.decimals : 0;
    const formatter = options.formatter || null;

    // Get current value from element text
    let currentText = $el.text().trim();
    let currentValue = 0;
    
    // Handle special cases like "20x" for ROI first
    if (currentText.includes('x') || options.hasX) {
        currentValue = parseFloat(currentText.replace('x', '').replace(/,/g, '').trim()) || 0;
    } else {
        // Remove prefix and suffix to extract number
        if (prefix) currentText = currentText.replace(new RegExp(prefix.replace('$', '\\$')), '');
        if (suffix) currentText = currentText.replace(new RegExp(suffix.replace('$', '\\$')), '').trim();
        
        // Extract numeric value (remove commas and non-numeric chars except decimal point)
        currentText = currentText.replace(/,/g, '');
        currentValue = parseFloat(currentText.replace(/[^0-9.-]/g, '')) || 0;
    }

    const startValue = currentValue;
    const difference = targetValue - startValue;
    const startTime = performance.now();

    // Easing functions
    const easingFunctions = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    };

    const ease = easingFunctions[easing] || easingFunctions.easeOutCubic;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = ease(progress);
        const current = startValue + (difference * easedProgress);

        // Format the number
        let formattedValue;
        if (formatter) {
            formattedValue = formatter(current);
        } else {
            // Round to specified decimals
            const rounded = decimals > 0 ? current.toFixed(decimals) : Math.round(current);
            formattedValue = parseFloat(rounded).toLocaleString('en-US');
        }

        // Apply prefix and suffix
        let displayValue = prefix + formattedValue + suffix;
        
        // Special handling for ROI (has "x" suffix)
        if (options.hasX) {
            displayValue = formattedValue + 'x';
        }

        $el.text(displayValue);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Ensure final value is exact
            let finalFormatted;
            if (formatter) {
                finalFormatted = formatter(targetValue);
            } else {
                const rounded = decimals > 0 ? targetValue.toFixed(decimals) : Math.round(targetValue);
                finalFormatted = parseFloat(rounded).toLocaleString('en-US');
            }
            let finalDisplay = prefix + finalFormatted + suffix;
            if (options.hasX) {
                finalDisplay = finalFormatted + 'x';
            }
            $el.text(finalDisplay);
        }
    }

    requestAnimationFrame(animate);
}

/**
 * Animate multiple values with a slight stagger
 */
function animateMultipleValues(animations, staggerDelay = 30) {
    animations.forEach((anim, index) => {
        setTimeout(() => {
            animateValue(anim.element, anim.target, anim.options || {});
        }, index * staggerDelay);
    });
}

