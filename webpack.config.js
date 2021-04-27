const webpack = require('webpack');
// этот файл - инструмент сборки
const path  = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin') // работай с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // очистка кеша
const CopyWebpackPlugin = require('copy-webpack-plugin') // копируй-перетаскивай
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // работай с css (вставляй стили в файл css)
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // минифицируй css
const TerserWebpackPlugin = require('terser-webpack-plugin') // минифицируй js
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // через него прикрутить externals с массивом объектов, содержащих урлы с cdn библтотек
const Dotenv = require('dotenv-webpack');

const isDev = process.env.NODE_ENV === 'development' // определяй в каком сейчас режиме
const isProd = !isDev                                //

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    } 

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config 
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders  = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hrm: isDev, // hot module replacement // изменяй определенные сущности без перезагрузки страницы 
                reloadAll: true,
                publicPath: '../../'
            },
        }, 
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
        }
    ] // свой style-loader в комплекте

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = (preset) => {
    const opts = {
        // presets: [
        //     '@babel/preset-env',
        // ],
        presets: [
            "@babel/typescript",
            "@babel/preset-env", 
            "@babel/preset-react"
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    } 

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions() 
        }
    ]

    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './assets/templates/index.html',
            minify: {
                collapseWhitespace: !isProd
            },
            inject: true,
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, './src/assets/js/utils/*'),
        //             to: path.resolve(__dirname, './dist/')
        //         },
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/' + filename('css') // filename('css') // 'assets/css/' + filename('css')
        }),
        new Dotenv()
    ]

    return base 
}

//
module.exports = {
    context: path.resolve(__dirname, 'src'), // со всех путях  удаляю эту папку
    mode: 'development',
    entry: { // точка входа в приложение, откуда начать
        script: ['@babel/polyfill', './index.tsx'],
        // style: './assets/sass/style.scss',
        // 'assets/js/index': ['@babel/polyfill', './assets/js/index.js'],
        // 'assets/css/style': './assets/sass/style.scss'
    },
    output: { // куда складывать результаты работы
        filename: 'assets/js/' + filename('js'), // filename('js'), // 'assets/js/' + filename('js'), // '[name]' // '[name].[hash].js', // итоговый файл, после сборкивсех js файлов
        path: path.resolve(__dirname, 'dist'), // отталкиваясь от текущей директории, складывать все в dist
        publicPath: '/' // относительная ссылка, которая будет подставляться из браузера
    },
    resolve: {
        extensions: [ // какие расширения нужно понимать по умолчанию
            '.js', '.json', '.png', '.ts', '.tsx'
        ],
       alias: { // путь до корня проекта
           '@assets': path.resolve(__dirname, 'src/assets'),
           '@': path.resolve(__dirname, 'src')
       } 
    },
    optimization: optimization(),
    devServer: {
        overlay: true, // вывод ошибок на экранб в браузер
        port: 4200,
        hot: isDev, // если разработка - true
        historyApiFallback: true // отдаем по любому url главный html файл - index.html
    },
    devtool: isDev ? 'source-map' : '',
    externals: {
        // jquery: 'jQuery'
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.css$/,
                use: cssLoaders() 
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader',
            //         // 'css-loader'
            //         'css-modules-typescript-loader?modules',
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: {
            //                     // css модули
            //                     mode: 'local',
            //                     localIdentName: '[name]__[local]__[hash:base64:5]', //
            //                     auto: /\.module\.\w+$/i, // использование модулей
            //                 },
            //             },
            //         },
            //         'sass-loader',
            //     ],
            // },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            // publicPath: 'src/assets/images/', // ? src/assets/images/
                            // outputPath: '/images/',
                            // useRelativePath: true
                        }
                    },
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65
                    //         },
                    //         optipng: {
                    //             optimizationLevel: 7,
                    //         },
                    //         pngquant: {
                    //             quality: [0.65, 0.90],
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // }
                ]
            },
            {
                test: /\.(pdf|txt|doc|docx)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }                        
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }                        
                    }
                ]
            },
            {
                test: /\.json$/,
                // loader: 'json-loader',
                use: [
                    'json-loader',
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[path][name].[ext]',
                    //         publicPath: '../../',
                    //     }
                    // },
                ],
                type: 'javascript/auto'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // include: path.resolve(__dirname, 'src/js'), // ?
                use: jsLoaders()
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/assets/templates'),
                // use: ['raw-loader'], // html-loader // raw-loader
                use: [
                    'raw-loader',
                    // {
                    //     loader: 'html-loader',
                    //     options: {
                    //         minimize: false,
                    //     }
                    // }
                ]
            },
        ]
    }
}