import { fetchFloodData } from './src/utils/floodApi';

async function verifyCalculations() {
    console.log('Fetching flood data...');
    try {
        const regions = await fetchFloodData();
        console.log(`Fetched ${regions.length} regions.`);

        regions.forEach(region => {
            console.log(`\nRegion: ${region.name} (${region.id})`);
            console.log(`  Current Discharge: ${region.currentDischarge}`);
            console.log(`  Max Discharge (7 days): ${region.maxDischarge}`);
            console.log(`  Calculated Risk: ${region.riskLevel}`);

            // Verification Logic
            const ratio = (region.currentDischarge || 0) / (region.maxDischarge || 100);
            let expectedRisk = 'low';

            // Check minimum discharge threshold
            if ((region.currentDischarge || 0) > 50) {
                if (ratio > 0.80) expectedRisk = 'very-high';
                else if (ratio > 0.60) expectedRisk = 'high';
                else if (ratio > 0.40) expectedRisk = 'medium';
            }

            const isCorrect = region.riskLevel === expectedRisk;
            console.log(`  Ratio: ${ratio.toFixed(2)} -> Expected: ${expectedRisk}`);
            console.log(`  Status: ${isCorrect ? 'PASS' : 'FAIL'}`);

            if (!isCorrect) {
                console.error(`  MISMATCH! Region ${region.name} has risk ${region.riskLevel} but calculated ratio ${ratio.toFixed(2)} suggests ${expectedRisk}`);
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

verifyCalculations();
