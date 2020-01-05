const chai = require('chai');
const LookupService = require('../../app/Services/FilenameUnderstanderService');
const fileService = new LookupService();
const assert = chai.assert;
process.env.APP_ENV='production'
describe('loading the application', function () {

    beforeEach(() => {
        require('fringejs');
        require('../../bootstrap/helpers')
    });


    [
        "038. Akira.mp4",
        "Akira.2016.HDRiP.AAC-LC.x264-LEGi0N.mov",
        "Akira (2019) - Upscaled - 720p - DesiSCR-Rip Hindi - x264 - AC3 - 5.1 Mafiaking -M2Tv.flv",
        "Akira 2017 TELESYNC X264 AC3 MAXPRO.mov",
        "01.Akira.mp4",
        "Akira.UNRATED.720p.BRRip.x264.AAC-ETRG.mp4",
        "Akira (2012) 720p BluRay - x265 HEVC -972MB - ShAaN.flv",
        "[ www.Speed.cd ] -Akira.S07E07.720p.HDTV.X264-DIMENSION.mp4",
        "Akira.s02e20.rus.eng.720p.Kybik.v.Kybe.mov",
        "akira.8x12.720p_hdtv_x264-fov.mov",
        "Akira.mp4",
        "[thing] Akira 3801.mov",
        "[720pMkv.Com]_akira.s05e10.480p.BluRay.x264-GAnGSteR.flv",
        "Akira (2014) Dual Audio WEB-DL 720p MKV x264.mov",
        "akira(2014) Dual Audio 480p.BluRay.x264-GAnGSteR.mov",
        "02. Akira.mp4",
    ].map(fileName =>
        it('understands ' + fileName, (done) => {
            const output = fileService.lookup(app.base_path('storage/'+fileName))

            assert.equal('Akira', output.parsed_title);
            done();
          })
    );

    [
        "038. The.Secret.Life.of.Pets.mp4",
        "The.Secret.Life.of.Pets.2016.HDRiP.AAC-LC.x264-LEGi0N",
        "The Secret Life of Pets (2019) - Upscaled - 720p - DesiSCR-Rip Hindi - x264 - AC3 - 5.1 Mafiaking -M2Tv",
        "The Secret Life of Pets 2017 TELESYNC X264 AC3 MAXPRO",
        "01.The Secret Life of Pets.mp4",
        "The.Secret.Life.of.Pets.UNRATED.720p.BRRip.x264.AAC-ETRG",
        "The Secret Life of Pets (2012) 720p BluRay - x265 HEVC -972MB - ShAaN",
        "[ www.Speed.cd ] -The.Secret.Life.of.Pets.S07E07.720p.HDTV.X264-DIMENSION",
        "The.Secret.Life.Of.Pets.s02e20.rus.eng.720p.Kybik.v.Kybe",
        "the_secret_life_of_pets.8x12.720p_hdtv_x264-fov",
        "the_secret_life_of_pets",
        "[thing] The_Secret_Life_of_Pets 3801.mov",
        "[720pMkv.Com]_the.secret.life.of.pets.s05e10.480p.BluRay.x264-GAnGSteR",
        "The Secret Life of Pets (2014) Dual Audio WEB-DL 720p MKV x264.mov",
        "the_secret_life_of_pets_(2014) Dual Audio 480p.BluRay.x264-GAnGSteR.mov",
        "02. The Secret Life of Pets.mp4",
    ].map(fileName =>
        it('understands ' + fileName, (done) => {
            const output = fileService.lookup(app.base_path('storage/'+fileName))

            assert.equal('The secret life of pets', output.parsed_title);
            done();
          })
    );
});